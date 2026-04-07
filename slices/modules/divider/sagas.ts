import { spawn } from "redux-saga/effects";
import { dividerEntitiesSaga } from "./entities/sagas";
import { dividerFeaturesSaga } from "./features/sagas";

export function* dividerSaga() {
	yield spawn(dividerEntitiesSaga);
	yield spawn(dividerFeaturesSaga);
}
