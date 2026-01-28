import { saveAs } from "file-saver";
import { domToPng } from "modern-screenshot";
import { call } from "ramda";
import { put, select, takeEvery } from "redux-saga/effects";
import { selectDividerById, selectLayout } from "@/modules/divider/shared/lib";
import { selectDPI } from "@/modules/print/shared/lib";
import { setDividerRenderId } from "@/modules/render/shared/lib";
import type { ReturnAwaited } from "@/shared/model";
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
	const scale = dpi / 96;

	yield put(setDividerRenderId(payload));

	const render = () => domToPng(node, { scale });

	const dataUrl: ReturnAwaited<typeof domToPng> = yield call(render);

	yield put(setDividerRenderId(null));

	const filename = `${divider.title}.png`;

	saveAs(dataUrl, filename);
}

export function* downloadDividerAsImageSaga() {
	yield takeEvery(downloadDividerAsImage.match, worker);
}
