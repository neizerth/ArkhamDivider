import { fork } from "redux-saga/effects";
import { generatePlayerDividersSaga } from "./generatePlayerDividers/generatePlayerDividersSaga";
import { generateScenarioDividersSaga } from "./generateScenarioDividers/generateScenarioDividersSaga";

export function* dividerEntitiesSaga() {
	yield fork(generateScenarioDividersSaga);
	yield fork(generatePlayerDividersSaga);
}
