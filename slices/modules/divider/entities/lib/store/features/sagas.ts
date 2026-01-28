import { fork } from "redux-saga/effects";
import { downloadDividerAsImageSaga } from "../../../../../render/entities/lib/store/features/downloadDividerAsImage/downloadDividerAsImageSaga";
import { generateScenarioDividersSaga } from "./generateScenarioDividers/generateScenarioDividersSaga";

export function* dividerEntitiesSaga() {
	yield fork(generateScenarioDividersSaga);
	yield fork(downloadDividerAsImageSaga);
}
