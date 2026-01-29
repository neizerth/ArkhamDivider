import { put, takeEvery } from "redux-saga/effects";
import { cancelDividerRendering } from "../../entities/lib/store/features/renderDivider";
import { startRender } from "../../shared/lib";

function* worker() {
	yield put(cancelDividerRendering());
}

export function* cancelDividerRenderingOnStartSaga() {
	yield takeEvery(startRender.match, worker);
}
