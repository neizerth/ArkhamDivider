import { fork } from "redux-saga/effects";
import { loadCoreDataSaga } from "./load-core-data/loadCoreDataSaga";
import { loadTranslationDataSaga } from "./load-translation-data/loadTranslationDataSaga";

export function* appFeaturesSaga() {
	yield fork(loadCoreDataSaga);
	yield fork(loadTranslationDataSaga);
}
