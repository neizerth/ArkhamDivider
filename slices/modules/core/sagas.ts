import { fork } from "redux-saga/effects";
import { appSaga } from "./app/app/sagas";
import { iconSaga } from "./icon/sagas";

export function* coreModuleSaga() {
	yield fork(appSaga);
	yield fork(iconSaga);
}
