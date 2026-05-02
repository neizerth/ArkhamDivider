import { REHYDRATE } from "redux-persist";
import { put, takeEvery, takeLatest } from "redux-saga/effects";
import { appStarted } from "@/modules/core/app/shared/lib";
import { finishRender } from "../../shared/lib";

function* worker() {
	yield put(finishRender());
}

export function* clearRenderingOnStartSaga() {
	yield takeLatest(REHYDRATE, worker);
	yield takeEvery(appStarted.match, worker);
}
