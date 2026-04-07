import { spawn } from "redux-saga/effects";
import { encounterSetFeaturesSaga } from "./features/sagas";

export function* encounterSetSaga() {
	yield spawn(encounterSetFeaturesSaga);
}
