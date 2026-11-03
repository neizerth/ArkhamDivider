import { spawn } from "redux-saga/effects";
import { fileFeaturesSaga } from "./features/sagas";

export function* fileSaga() {
	yield spawn(fileFeaturesSaga);
}
