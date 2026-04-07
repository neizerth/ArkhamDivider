import { spawn } from "redux-saga/effects";
import { i18nEntitiesSaga } from "./entities/sagas";
import { i18nFeaturesSaga } from "./features/sagas";

export function* i18nSaga() {
	yield spawn(i18nFeaturesSaga);
	yield spawn(i18nEntitiesSaga);
}
