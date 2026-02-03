import { spawn } from "redux-saga/effects";
import { appFeaturesSaga } from "../features/sagas";

export function* appSaga() {
	yield spawn(appFeaturesSaga);
}
