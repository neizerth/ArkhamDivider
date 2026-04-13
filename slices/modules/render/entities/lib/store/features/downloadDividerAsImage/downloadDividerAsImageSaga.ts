import { saveAs } from "file-saver";
import { call, put, select, takeLatest } from "redux-saga/effects";
import { selectLayout } from "@/modules/divider/entities/lib";
import {
	selectDividerById,
	selectPrintableLayoutSize,
} from "@/modules/divider/shared/lib";
import { selectDPI } from "@/modules/print/shared/lib";
import {
	finishRender,
	renderDivider,
	setDividerRenderId,
	startRender,
} from "@/modules/render/shared/lib";
import type { ReturnAwaited } from "@/shared/model";
import { downloadDividerAsImage } from "./downloadDividerAsImage";

function* worker({ payload }: ReturnType<typeof downloadDividerAsImage>) {
	const { dividerId, imageFormat } = payload;

	const divider: ReturnType<typeof selectDividerById> = yield select(
		selectDividerById,
		dividerId,
	);

	const printableLayoutSize: ReturnType<typeof selectPrintableLayoutSize> =
		yield select(selectPrintableLayoutSize);

	const layout: ReturnType<typeof selectLayout> = yield select(selectLayout);

	if (!divider || !printableLayoutSize || !layout) {
		return;
	}

	const { size } = printableLayoutSize;

	const dpi: ReturnType<typeof selectDPI> = yield select(selectDPI);

	yield put(startRender({ renderType: "image" }));

	yield put(setDividerRenderId(dividerId));

	const contents: ReturnAwaited<typeof renderDivider> = yield call(
		renderDivider,
		{
			dividerId,
			dpi,
			imageFormat,
			size,
			...layout.renderOptions,
		},
	);

	const blob = new Blob([contents as BlobPart], {
		type: `image/${imageFormat}`,
	});

	yield put(finishRender());

	const filename = `${divider.title}.${imageFormat}`;

	saveAs(blob, filename);
}

export function* downloadDividerAsImageSaga() {
	yield takeLatest(downloadDividerAsImage.match, worker);
}
