import { spawn } from "redux-saga/effects";
import { changeLayoutColorSaga } from "./changeLayoutColor/changeLayoutColorSaga";
import { changeLayoutOrientationSaga } from "./changeLayoutOrientation/changeLayoutOrientationSaga";
import { generateInvestigatorDividersSaga } from "./generateInvestigatorDividers/generateInvestigatorDividersSaga";
import { generatePlayerDividersSaga } from "./generatePlayerDividers/generatePlayerDividersSaga";
import { generateScenarioDividersSaga } from "./generateScenarioDividers/generateScenarioDividersSaga";

export function* dividerEntitiesSaga() {
	yield spawn(generateScenarioDividersSaga);
	yield spawn(generatePlayerDividersSaga);
	yield spawn(generateInvestigatorDividersSaga);
	yield spawn(changeLayoutColorSaga);
	yield spawn(changeLayoutOrientationSaga);
}
