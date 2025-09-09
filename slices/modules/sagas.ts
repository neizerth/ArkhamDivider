import { fork } from "redux-saga/effects";
import { coreModuleSaga } from "./core/sagas";

export function* modulesSaga() {
	yield fork(coreModuleSaga);
}
