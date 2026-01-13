import { fork } from "redux-saga/effects";
import { changeLanguageBundleSaga } from "./features/changeLanguageBundle/changeLanguageBundleSaga";

export function* i18nEntitiesSaga() {
	yield fork(changeLanguageBundleSaga);
}
