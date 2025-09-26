import { takeEvery } from "redux-saga/effects";
import { i18n } from "../../shared/config";
import { setLanguage } from "../../shared/lib/store";

function worker({ payload }: ReturnType<typeof setLanguage>) {
	i18n.changeLanguage(payload);
}

export function* updateI18NOnLanguageSetSaga() {
	yield takeEvery(setLanguage.match, worker);
}
