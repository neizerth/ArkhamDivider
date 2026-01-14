import { fork } from "redux-saga/effects";
import { dividerFeaturesSaga } from "./features/sagas";

export function* dividerSaga() {
	yield fork(dividerFeaturesSaga);
}
