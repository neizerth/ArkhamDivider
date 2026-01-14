import { fork } from "redux-saga/effects";
import { coreModuleSaga } from "./core/sagas";
import { dividerSaga } from "./divider/sagas";
import { storySaga } from "./story/sagas";

export function* modulesSaga() {
	yield fork(coreModuleSaga);
	yield fork(storySaga);
	yield fork(dividerSaga);
}
