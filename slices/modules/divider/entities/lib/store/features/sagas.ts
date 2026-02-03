import { spawn } from "redux-saga/effects";
import { generatePlayerDividersSaga } from "./generatePlayerDividers/generatePlayerDividersSaga";
import { generateScenarioDividersSaga } from "./generateScenarioDividers/generateScenarioDividersSaga";

export function* dividerEntitiesSaga() {
	yield spawn(generateScenarioDividersSaga);
	yield spawn(generatePlayerDividersSaga);
}
