import { fork } from "redux-saga/effects";
import { initI18nSaga } from "./init-i18n/initI18nSaga";

export function* i18nFeaturesSaga() {
	yield fork(initI18nSaga);
}
