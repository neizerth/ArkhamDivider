import { fork } from "redux-saga/effects";
import { renderEntitiesSaga } from "./entities/sagas";
import { renderFeaturesSaga } from "./features/sagas";

export function* renderSaga() {
	yield fork(renderEntitiesSaga);
	yield fork(renderFeaturesSaga);
}
