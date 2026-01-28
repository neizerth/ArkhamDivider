import { fork } from "redux-saga/effects";
import { generateScenarioDividersSaga } from "./generateScenarioDividers/generateScenarioDividersSaga";

export function* dividerEntitiesSaga() {
	yield fork(generateScenarioDividersSaga);
}
