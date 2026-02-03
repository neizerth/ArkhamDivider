import { spawn } from "redux-saga/effects";
import { loadIconsSaga } from "./load-icons/loadIconsSaga";

export function* iconFeaturesSaga() {
	yield spawn(loadIconsSaga);
}
