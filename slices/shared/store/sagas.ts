import { fork } from "redux-saga/effects";
import { modulesSaga } from "@/modules/sagas";

export function* rootSaga() {
	yield fork(modulesSaga);
}
