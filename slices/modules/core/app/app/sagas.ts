import { fork } from "redux-saga/effects";
import { appFeaturesSaga } from "../features/sagas";

export function* appSaga() {
	yield fork(appFeaturesSaga);
}
