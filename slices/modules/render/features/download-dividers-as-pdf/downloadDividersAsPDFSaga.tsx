import { saveAs } from "file-saver";
import { last } from "ramda";
import { call, put, select, takeLatest } from "redux-saga/effects";
import { i18n } from "@/modules/core/i18n/shared/config";
import { getDividerPageLayouts } from "@/modules/divider/entities/lib/logic";
import { PDFService } from "@/modules/pdf/entities/lib/pdf.service";
import type { DividerRender } from "@/modules/render/shared/model";
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
	}: ReturnType<typeof selectPDFData> = yield select(selectPDFData);

	const total = dividers.length;
	const lastId = last(dividers)?.id;

	if (total === 0 || !layoutGrid || !pageFormat || !layout || !lastId) {
		return;
	}

	const { dpi = 300 } = payload;

	const message = i18n.t("render.status.initializing");

	yield put(
		startRender({
			message,
			total,
			value: 0,
		}),
	);

	yield call(getVips);

	yield put(setRenderStatusMessage(i18n.t("render.status.rendering")));

	yield put(setHideTextNodes(true));
	yield put(setHideIconNodes(true));
	yield put(setRenderProgressTotal(total));

	const renders: DividerRender[] = [];

	for (let i = 0; i < dividers.length; i++) {
		const divider = dividers[i];
		const dividerId = divider.id;

		yield put(setDividerRenderId(dividerId));

		const background: ReturnAwaited<typeof renderCMYKDivider> = yield call(
			renderCMYKDivider,
			{
				dividerId,
				dpi,
				imageFormat: "png",
			},
		);

		renders.push({
			...divider,
			background,
		});

		yield put(setRenderProgress(i + 1));
	}

	yield put(setRenderStatusMessage(i18n.t("render.status.creatingPDF")));

	const pageLayouts = getDividerPageLayouts({
		dividers: renders,
		layoutGrid,
		doubleSided,
		singleItemPerPage,
	});

	const pdf: ReturnAwaited<typeof PDFService.from> = yield call(
		PDFService.from,
		{
			dividers: renders,
			layout,
			pageLayouts,
			pageFormat,
			dpi,
			icons,
			bleedEnabled,
		},
	);

	const pdfBytes: ReturnAwaited<typeof pdf.create> = yield call(pdf.create);
	const blob = new Blob([pdfBytes as BlobPart], { type: "application/pdf" });

	const filename = "Arkham Divider.pdf";
	saveAs(blob, filename);

	yield put(finishRender());
}

export function* downloadDividersAsPDFSaga() {
	yield takeLatest(downloadDividersAsPDF.match, worker);
}
