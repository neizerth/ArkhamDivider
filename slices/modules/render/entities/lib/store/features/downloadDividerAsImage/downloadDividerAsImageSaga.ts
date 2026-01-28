import { saveAs } from "file-saver";
import { put, race, select, take, takeEvery } from "redux-saga/effects";
import { selectDividerById, selectLayout } from "@/modules/divider/shared/lib";
import { selectDPI } from "@/modules/print/shared/lib";
import { finishRender, startRender } from "@/modules/render/shared/lib";
import {
	renderDivider,
	renderDividerFailure,
	renderDividerSuccess,
} from "../renderDivider";
import { downloadDividerAsImage } from "./downloadDividerAsImage";

function* worker({ payload }: ReturnType<typeof downloadDividerAsImage>) {
	const node = document.querySelector(`[data-divider-id="${payload}"]`);
	const divider: ReturnType<typeof selectDividerById> = yield select(
		selectDividerById,
		payload,
	);

	const layout: ReturnType<typeof selectLayout> = yield select(selectLayout);

	if (!node || !divider || !layout) {
		return;
	}

	const dpi: ReturnType<typeof selectDPI> = yield select(selectDPI);

	yield put(startRender({}));

	yield put(
		renderDivider({
			dividerId: payload,
			dpi,
			colorScheme: "rgb",
			imageFormat: "png",
		}),
	);

	const {
		success,
		error,
	}: {
		success: ReturnType<typeof renderDividerSuccess>;
		error: ReturnType<typeof renderDividerFailure>;
	} = yield race({
		success: take(renderDividerSuccess.match),
		error: take(renderDividerFailure.match),
	});

	yield put(finishRender());

	if (error || !success) {
		return;
	}

	if (success.payload.colorScheme !== "rgb") {
		return;
	}

	const { contents } = success.payload;

	const filename = `${divider.title}.png`;

	saveAs(contents, filename);
}

export function* downloadDividerAsImageSaga() {
	yield takeEvery(downloadDividerAsImage.match, worker);
}
