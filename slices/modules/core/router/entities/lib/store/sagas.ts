import { fork } from "redux-saga/effects";
import { changeLocationSaga } from "./features/changeLocation/changeLocationSaga";

export function* routerEntitiesSaga() {
	yield fork(changeLocationSaga);
}
