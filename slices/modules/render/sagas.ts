import { fork } from "redux-saga/effects";
import { renderEntitiesSaga } from "./entities/sagas";

export function* renderSaga() {
	yield fork(renderEntitiesSaga);
}
