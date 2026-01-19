import { fork } from "redux-saga/effects";
import { encounterSetFeaturesSaga } from "./features/sagas";

export function* encounterSetSaga() {
	yield fork(encounterSetFeaturesSaga);
}
