import { spawn } from "redux-saga/effects";
import { changeLanguageBundleSaga } from "./features/changeLanguageBundle/changeLanguageBundleSaga";

export function* i18nEntitiesSaga() {
	yield spawn(changeLanguageBundleSaga);
}
