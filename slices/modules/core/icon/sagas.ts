import { fork } from "redux-saga/effects";
import { iconFeaturesSaga } from "./features/sagas";

export function* iconSaga() {
	yield fork(iconFeaturesSaga);
}
