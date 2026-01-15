import { fork } from "redux-saga/effects";
import { loadCoreDataSaga } from "./load-core-data/loadCoreDataSaga";

export function* appFeaturesSaga() {
	yield fork(loadCoreDataSaga);
}
