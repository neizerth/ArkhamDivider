import { saveAs } from "file-saver";
import { call, put, select, takeLatest } from "redux-saga/effects";
import {
	selectDividerById,
	selectPrintableLayoutSize,
} from "@/modules/divider/shared/lib";
import { selectDPI } from "@/modules/print/shared/lib";
import {
	finishRender,
	renderCMYKDivider,
	setDividerRenderId,
	startRender,
} from "@/modules/render/shared/lib";
import type { ReturnAwaited } from "@/shared/model";

import { downloadDividerAsImage } from "./downloadDividerAsImage";

function* worker({ payload }: ReturnType<typeof downloadDividerAsImage>) {
	const divider: ReturnType<typeof selectDividerById> = yield select(
		selectDividerById,
		payload,
	);

	const printableLayoutSize: ReturnType<typeof selectPrintableLayoutSize> =
		yield select(selectPrintableLayoutSize);

	if (!divider || !printableLayoutSize) {
		return;
	}

	const { size } = printableLayoutSize;

	const dpi: ReturnType<typeof selectDPI> = yield select(selectDPI);

	yield put(startRender({}));

	yield put(setDividerRenderId(payload));

	const contents: ReturnAwaited<typeof renderCMYKDivider> = yield call(
		renderCMYKDivider,
		{
			dividerId: payload,
			dpi,
			imageFormat: "jpeg",
			iccProfile: "USWebCoatedSWOP.icc",
			colourspace: "lab",
			stripIccProfile: true,
			size,
		},
	);

	yield put(finishRender());

	const blob = new Blob([contents as BlobPart], {
		type: "image/jpeg",
	});

	const filename = `${divider.title}.jpg`;

	saveAs(blob, filename);
}

export function* downloadDividerAsImageSaga() {
	yield takeLatest(downloadDividerAsImage.match, worker);
}
