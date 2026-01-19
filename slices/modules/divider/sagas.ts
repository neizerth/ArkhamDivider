import { fork } from "redux-saga/effects";
import { dividerEntitiesSaga } from "./entities/sagas";
import { dividerFeaturesSaga } from "./features/sagas";

export function* dividerSaga() {
	yield fork(dividerEntitiesSaga);
	yield fork(dividerFeaturesSaga);
}
