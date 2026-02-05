import { Buffer } from "buffer";
import PDFDocument from "pdfkit/js/pdfkit.standalone.js";
import { last } from "ramda";

import { call, put, select, takeLatest } from "redux-saga/effects";
import streamSaver from "streamsaver";
import { dividerPDFComponents } from "@/modules/divider/entities/items";
import { getDividerPageLayouts } from "@/modules/divider/entities/lib/logic";
import {
	getPDFPageLayouts,
	PDFFontService,
	PDFIconService,
	PDFTextService,
	PDFUnitService,
} from "@/modules/pdf/shared/lib";
import { fromPx2Pt, getPageSizePx, mm2px } from "@/modules/print/shared/lib";
import type { ReturnAwaited } from "@/shared/model";
import {
	finishRender,
	getVips,
	renderDivider,
	setDividerRenderId,
	setHideIconNodes,
	setHideTextNodes,
	setRenderProgress,
	setRenderProgressTotal,
	setRenderStatusMessage,
	startRender,
} from "../../shared/lib";
import { downloadDividersAsPDF } from "./downloadDividersAsPDF";
import { selectPDFData } from "./lib";

function* worker({ payload }: ReturnType<typeof downloadDividersAsPDF>) {
	const {
		dividers,
		layoutGrid,
		pageFormat,
		doubleSided,
		layout,
		singleItemPerPage,
		icons,
		bleedEnabled,
		language,
		scenarioParams,
		playerParams,
		investigatorParams,
	}: ReturnType<typeof selectPDFData> = yield select(selectPDFData);

	const total = dividers.length;
	const lastId = last(dividers)?.id;

	if (total === 0 || !layoutGrid || !pageFormat || !layout || !lastId) {
		return;
	}

	const { dpi = 300 } = payload;

	// Create stream and doc immediately (before any async work) so the download
	// is started in user gesture context and isn’t blocked by the browser.
	// Same-origin mitm avoids COEP blocking the cross-origin StreamSaver iframe.
	if (typeof window !== "undefined") {
		streamSaver.mitm = `${window.location.origin}/streamsaver/mitm.html?version=2.0.0`;
	}

	const fileName = `Arkham Divider.pdf`;
	const fileStream = streamSaver.createWriteStream(fileName);
	// Page size must be in px for fromPx2Pt; unitSize is in mm, so convert when singleItemPerPage
	const pageSizePx = singleItemPerPage
		? {
				width: mm2px(layoutGrid.unitSize.width, dpi),
				height: mm2px(layoutGrid.unitSize.height, dpi),
			}
		: getPageSizePx({ pageFormat, dpi });

	const px = fromPx2Pt(dpi);
	const pageSizePt = [px(pageSizePx.width), px(pageSizePx.height)] as const;

	const doc = new PDFDocument({
		size: [...pageSizePt],
		autoFirstPage: false,
		bufferPages: true,
	});
	const writer = fileStream.getWriter();

	let cancelled = false;

	doc.on("data", (chunk) => {
		writer.write(chunk).catch(() => {
			cancelled = true;
			try {
				(doc as unknown as { destroy(): void }).destroy();
			} catch {
				// ignore
			}
		});
	});

	doc.on("end", () => writer.close());

	doc.on("error", (error) => {
		console.error("error", error);
	});

	let progress = 0;

	yield put(
		startRender({
			message: "render.status.initializing",
			total,
			value: 0,
		}),
	);

	const vips: Awaited<ReturnType<typeof getVips>> = yield call(getVips);
	// Reduce vips memory pressure: no operation cache, allow enough tracked mem for 2 images
	if (typeof vips.Cache !== "undefined") {
		vips.Cache.max(0);
		vips.Cache.maxMem(80 * 1024 * 1024);
	}

	yield put(setRenderStatusMessage("render.status.creatingPDF"));
	yield put(setHideTextNodes(true));
	yield put(setHideIconNodes(true));
	yield put(setRenderProgressTotal(total));

	const pageLayouts: ReturnType<typeof getDividerPageLayouts> = yield call(
		getDividerPageLayouts,
		{
			dividers,
			layoutGrid,
			doubleSided,
			singleItemPerPage,
		},
	);

	const pdfLayouts = getPDFPageLayouts({
		pageLayouts,
		pageFormat,
		dpi,
		singleItemPerPage,
	});

	const font = new PDFFontService(doc);
	const text = new PDFTextService(font);
	const icon = new PDFIconService(text, icons);

	const { backgroundSupport = true } = layout;
	const renderComponent = dividerPDFComponents[layout.categoryId];

	try {
		renderLoop: for (const pdfLayout of pdfLayouts) {
			if (cancelled) break;
			doc.addPage();
			for (const row of pdfLayout.items) {
				for (const item of row.items) {
					if (cancelled) {
						break renderLoop;
					}
					const itemSizePt = {
						width: px(item.size.width),
						height: px(item.size.height),
					};

					const positionTopLeft = {
						x: px(item.position.x),
						y: px(item.position.y),
					};
					// PDF has origin at bottom-left (y up); convert from top-left layout coordinates
					const position = {
						x: positionTopLeft.x,
						y: pageSizePt[1] - positionTopLeft.y - itemSizePt.height,
					};

					if (backgroundSupport) {
						yield put(setDividerRenderId(item.id));
						const { x, y } = position;
						let contents: ReturnAwaited<typeof renderDivider> | null =
							yield call(renderDivider, {
								dividerId: item.id,
								dpi,
								imageFormat: "jpeg",
								iccProfile: "USWebCoatedSWOP.icc",
								colourspace: "lab",
								stripIccProfile: true,
								size: item.size,
								quality: 100,
							});

						if (!contents) {
							continue;
						}
						let buffer: Buffer | null = Buffer.from(contents);
						doc.opacity(1);

						doc.image(buffer, x, y, itemSizePt);
						buffer = null;
						contents = null;
					}

					const unit = new PDFUnitService(doc, {
						dpi,
						position,
						size: itemSizePt,
						bleedEnabled,
						bleedSize: layout.bleed,
					});

					yield call(renderComponent, item, {
						dpi,
						layout,
						bleedEnabled,
						icon,
						text,
						unit,
						doc,
						language,
						scenarioParams,
						playerParams,
						investigatorParams,
					});

					progress++;
					yield put(setRenderProgress(progress));
				}
			}
		}
	} catch (error) {
		console.error("error", error);
	}

	if (!cancelled) {
		doc.end();
	}

	yield put(finishRender());
}

export function* downloadDividersAsPDFSaga() {
	yield takeLatest(downloadDividersAsPDF.match, worker);
}
