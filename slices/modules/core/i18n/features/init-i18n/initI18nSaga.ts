import { put, select, takeEvery } from "redux-saga/effects";
import { appDataLoaded } from "@/modules/core/app/shared/lib";
import {
	selectLanguage,
	setAvailableLanguages,
	setLanguage,
} from "../../shared/lib/store";
import { detectLanguage } from "./detectLanguage";

function* worker({ payload }: ReturnType<typeof appDataLoaded>) {
	const { languages } = payload;

	const currentLanguage: ReturnType<typeof selectLanguage> =
		yield select(selectLanguage);

	if (currentLanguage) {
		return;
	}

	yield put(setAvailableLanguages(languages));

	const language = detectLanguage(languages);

	if (!language) {
		return;
	}

	yield put(setLanguage(language));
}

export function* initI18nSaga() {
	yield takeEvery(appDataLoaded.match, worker);
}
