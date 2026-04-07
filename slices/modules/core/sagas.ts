import { spawn } from "redux-saga/effects";
import { appSaga } from "./app/app/sagas";
import { i18nSaga } from "./i18n/sagas";
import { iconSaga } from "./icon/sagas";
import { routerSaga } from "./router/sagas";

export function* coreModuleSaga() {
	yield spawn(appSaga);
	yield spawn(iconSaga);
	yield spawn(i18nSaga);
	yield spawn(routerSaga);
}
