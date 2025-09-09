import { fork } from "redux-saga/effects";
import { loadIconsSaga } from "./load-icons/loadIconsSaga";

export function* iconFeaturesSaga() {
	yield fork(loadIconsSaga);
}
