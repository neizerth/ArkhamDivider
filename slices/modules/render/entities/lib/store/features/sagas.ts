import { spawn } from "redux-saga/effects";
import { downloadDividerAsImageSaga } from "./downloadDividerAsImage/downloadDividerAsImageSaga";

export function* renderEntitiesSaga() {
	yield spawn(downloadDividerAsImageSaga);
}
