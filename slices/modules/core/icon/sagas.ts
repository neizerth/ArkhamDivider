import { spawn } from "redux-saga/effects";
import { iconFeaturesSaga } from "./features/sagas";

export function* iconSaga() {
	yield spawn(iconFeaturesSaga);
}
