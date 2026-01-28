import { fork } from "redux-saga/effects";
import { downloadDividerAsImageSaga } from "./downloadDividerAsImage/downloadDividerAsImageSaga";
import { generateScenarioDividersSaga } from "./generateScenarioDividers/generateScenarioDividersSaga";

export function* dividerEntitiesSaga() {
	yield fork(generateScenarioDividersSaga);
	yield fork(downloadDividerAsImageSaga);
}
