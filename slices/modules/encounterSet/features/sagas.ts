import { fork } from "redux-saga/effects";
import { setEncountersOnAppLoadedSaga } from "./set-encounters-on-app-loaded/setEncountersOnAppLoadedSaga";

export function* encounterSetFeaturesSaga() {
	yield fork(setEncountersOnAppLoadedSaga);
}
