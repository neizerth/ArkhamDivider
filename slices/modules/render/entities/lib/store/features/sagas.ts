import { fork } from "redux-saga/effects";
import { downloadDividerAsImageSaga } from "./downloadDividerAsImage/downloadDividerAsImageSaga";

export function* renderEntitiesSaga() {
	yield fork(downloadDividerAsImageSaga);
}
