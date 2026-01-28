import { call, put, select, takeEvery } from "redux-saga/effects";
// import { selectDividerIds } from "@/modules/divider/shared/lib";
import { i18n } from "@/modules/core/i18n/shared/config";
import { selectDividerIds } from "@/modules/divider/shared/lib";
import {
	getVips,
	setHideIconNodes,
	setHideTextNodes,
	setRenderStatusMessage,
	startRender,
} from "../../../shared/lib";
import { downloadDividersAsPDF } from "../downloadDividersAsPDF";

function* worker({ payload }: ReturnType<typeof downloadDividersAsPDF>) {
	const { dpi } = payload;
	console.log("pdf dpi", dpi);

	const message = i18n.t("render.status.initializing");

	yield put(
		startRender({
			message,
		}),
	);

	yield call(getVips);

	yield put(setRenderStatusMessage(null));

	yield put(setHideTextNodes(true));
	yield put(setHideIconNodes(true));

	const _dividerIds: ReturnType<typeof selectDividerIds> =
		yield select(selectDividerIds);
}

export function* startPDFDownloadSaga() {
	yield takeEvery(downloadDividersAsPDF.match, worker);
}
