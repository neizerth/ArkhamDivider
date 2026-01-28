import { fork } from "redux-saga/effects";
import { downloadDividerAsImageSaga } from "./downloadDividerAsImage/downloadDividerAsImageSaga";
import { renderDividerSaga } from "./renderDivider/renderDividerSaga";

export function* renderEntitiesSaga() {
	yield fork(downloadDividerAsImageSaga);
	yield fork(renderDividerSaga);
}
