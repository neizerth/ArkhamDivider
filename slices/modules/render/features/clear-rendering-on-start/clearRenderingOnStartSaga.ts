import { put, takeEvery } from "redux-saga/effects";
import { appStarted } from "@/modules/core/app/shared/lib";
import { finishRender } from "../../shared/lib";

function* worker() {
	yield put(finishRender());
}

export function* clearRenderingOnStartSaga() {
	yield takeEvery(appStarted.match, worker);
}
