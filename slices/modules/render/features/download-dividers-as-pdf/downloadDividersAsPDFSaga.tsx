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
import { fromPx2Pt, getPageSizePx } from "@/modules/print/shared/lib";
import type { ReturnAwaited } from "@/shared/model";
import {
	finishRender,
	getVips,
	renderCMYKDivider,
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
	const pageSize = getPageSizePx({ pageFormat, dpi });

	const px = fromPx2Pt(dpi);
	const size = [px(pageSize.width), px(pageSize.height)];

	// const size = [pageSize.width, pageSize.height];

	const doc = new PDFDocument({
		size,
		autoFirstPage: false,
		bufferPages: true,
	});
	const writer = fileStream.getWriter();

	doc.on("data", (chunk) => {
		writer.write(chunk);
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

	yield call(getVips);

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

	const pdfLayouts = getPDFPageLayouts({ pageLayouts, pageFormat, dpi });

	const font = new PDFFontService(doc);
	const text = new PDFTextService(font);
	const icon = new PDFIconService(text, icons);

	const { backgroundSupport = true } = layout;
	const renderDivider = dividerPDFComponents[layout.categoryId];

	try {
		for (const pdfLayout of pdfLayouts) {
			doc.addPage();
			for (const row of pdfLayout.items) {
				for (const item of row.items) {
					const size = {
						width: px(item.size.width),
						height: px(item.size.height),
					};

					const position = {
						x: px(item.position.x),
						y: px(item.position.y),
					};

					if (backgroundSupport) {
						yield put(setDividerRenderId(item.id));
						const { x, y } = position;
						let contents: ReturnAwaited<typeof renderCMYKDivider> | null =
							yield call(renderCMYKDivider, {
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

						doc.image(buffer, x, y, size);
						buffer = null;
						contents = null;
					}

					const unit = new PDFUnitService(doc, {
						dpi,
						position,
						size,
						bleedEnabled,
						bleedSize: layout.bleed,
					});

					const render = () =>
						renderDivider(item, {
							dpi,
							layout,
							bleedEnabled,
							icon,
							text,
							unit,
							doc,
							language,
						});

					yield call(render);

					progress++;
					yield put(setRenderProgress(progress));
				}
			}
		}
	} catch (error) {
		console.error("error", error);
	}

	doc.end();

	yield put(finishRender());
}

export function* downloadDividersAsPDFSaga() {
	yield takeLatest(downloadDividersAsPDF.match, worker);
}
