import { REHYDRATE } from "redux-persist";
import { put, takeLatest } from "redux-saga/effects";
import { finishRender } from "../../shared/lib";

function* worker() {
	yield put(finishRender());
}

export function* clearRenderingOnStartSaga() {
	yield takeLatest(REHYDRATE, worker);
}
