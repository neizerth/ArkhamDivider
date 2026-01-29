import { pdf } from "@react-pdf/renderer";
import type { PayloadAction } from "@reduxjs/toolkit";
import { saveAs } from "file-saver";
import { call, put, select, take, takeEvery } from "redux-saga/effects";
import { i18n } from "@/modules/core/i18n/shared/config";
import { getDividerPageLayouts } from "@/modules/divider/entities/lib/logic";
import {
	type CMYKRenderDividerSuccessPayload,
	renderDivider,
	renderDividerSuccess,
} from "@/modules/render/entities/lib/store/features/renderDivider";
import type { DividerRender } from "@/modules/render/shared/model";
import type { ReturnAwaited } from "@/shared/model";
import {
	finishRender,
	getVips,
	setHideIconNodes,
	setHideTextNodes,
	setRenderStatusMessage,
	startRender,
} from "../../shared/lib";
import { downloadDividersAsPDF } from "./downloadDividersAsPDF";
import { selectPDFData } from "./lib";
import { PDF } from "./ui";

function* worker({ payload }: ReturnType<typeof downloadDividersAsPDF>) {
	const {
		icons,
		bleed,
		language,
		categoryId,
		pageFormat,
		layoutGrid,
		doubleSided,
		singleItemPerPage,
		dividers,
	} = yield select(selectPDFData);

	const total = dividers.length;

	if (total === 0 || !layoutGrid || !pageFormat || !categoryId) {
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

	yield put(setRenderStatusMessage(null));

	yield put(setHideTextNodes(true));
	yield put(setHideIconNodes(true));

	const renders: DividerRender[] = [];

	for (const divider of dividers) {
		const dividerId = divider.id;

		yield put(
			renderDivider({
				dividerId,
				dpi,
				colorScheme: "cmyk",
				imageFormat: "png",
			}),
		);

		const action: PayloadAction<CMYKRenderDividerSuccessPayload> = yield take(
			renderDividerSuccess.match,
		);

		const contents = action.payload.contents as BlobPart;

		const blob = new Blob([contents]);

		const backgroundUrl = URL.createObjectURL(blob);
		renders.push({
			...divider,
			backgroundUrl,
			language,
			dpi,
			bleed,
			icons,
		});
	}

	const pageLayouts = getDividerPageLayouts({
		dividers: renders,
		layoutGrid,
		doubleSided,
		singleItemPerPage,
	});

	yield put(finishRender());

	const asPdf = pdf();

	const container = (
		<PDF
			categoryId={categoryId}
			pageLayouts={pageLayouts}
			pageFormat={pageFormat}
			dpi={dpi}
		/>
	);
	asPdf.updateContainer(container);

	const blob: ReturnAwaited<typeof asPdf.toBlob> = yield call(asPdf.toBlob);

	const filename = "Arkham Divider.pdf";
	saveAs(blob, filename);

	for (const divider of renders) {
		URL.revokeObjectURL(divider.backgroundUrl);
	}
}

export function* downloadDividersAsPDFSaga() {
	yield takeEvery(downloadDividersAsPDF.match, worker);
}
