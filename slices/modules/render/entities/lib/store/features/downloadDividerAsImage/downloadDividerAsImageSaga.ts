import { saveAs } from "file-saver";
import { call, put, select, takeLatest } from "redux-saga/effects";
import { selectDividerById, selectLayout } from "@/modules/divider/shared/lib";
import { selectDPI } from "@/modules/print/shared/lib";
import {
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

	const layout: ReturnType<typeof selectLayout> = yield select(selectLayout);

	if (!divider || !layout) {
		return;
	}

	const dpi: ReturnType<typeof selectDPI> = yield select(selectDPI);

	yield put(startRender({}));

	yield put(setDividerRenderId(payload));

	const contents: ReturnAwaited<typeof renderCMYKDivider> = yield call(
		renderCMYKDivider,
		{
			dividerId: payload,
			dpi,
			imageFormat: "png",
		},
	);

	const blob = new Blob([contents as BlobPart], { type: "image/png" });

	const filename = `${divider.title}.png`;

	saveAs(blob, filename);
}

export function* downloadDividerAsImageSaga() {
	yield takeLatest(downloadDividerAsImage.match, worker);
}
