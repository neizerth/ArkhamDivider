import { fork } from "redux-saga/effects";
import { initI18nSaga } from "./init-i18n/initI18nSaga";
import { navigateOnLanguageChangeSaga } from "./navigate-on-change-language/navigateOnLanguageChangeSaga";
import { setLanguageOnRouteChangeSaga } from "./set-language-on-route-change/setLanguageOnRouteChangeSaga";
import { updateI18NOnLanguageSetSaga } from "./update-i18n-on-language-set/updateI18NOnLanguageSetSaga";
import { updateTranslationsSaga } from "./update-translations/updateTranslationsSaga";

export function* i18nFeaturesSaga() {
	yield fork(initI18nSaga);
	yield fork(updateI18NOnLanguageSetSaga);
	yield fork(updateTranslationsSaga);
	yield fork(navigateOnLanguageChangeSaga);
	yield fork(setLanguageOnRouteChangeSaga);
}
