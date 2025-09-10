import { fork } from "redux-saga/effects";
import { i18nFeaturesSaga } from "./features/sagas";

export function* i18nSaga() {
	yield fork(i18nFeaturesSaga);
}
