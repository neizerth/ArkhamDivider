import { getContext, put, select, takeEvery } from "redux-saga/effects";
import { appDataLoaded } from "@/modules/core/app/shared/lib";
import type { AppRouter } from "@/modules/core/router/app/config";
import { replaceLocationLanguage } from "@/modules/core/router/entities/lib";
import { selectLocation } from "@/modules/core/router/shared/lib";
import { changeLanguageBundle } from "../../entities/lib/store/features/changeLanguageBundle";
import { DEFAULT_LANGUAGE } from "../../shared/config";
import {
	selectLanguage,
	setAvailableLanguages,
	setLanguage,
} from "../../shared/lib/store";
import { detectLanguage } from "./detectLanguage";

function* worker({ payload }: ReturnType<typeof appDataLoaded>) {
	const { languages } = payload;

	const currentLanguage = (yield select(selectLanguage)) as string | null;

	yield put(setAvailableLanguages(languages));

	if (currentLanguage) {
		yield put(changeLanguageBundle(currentLanguage));
		return;
	}

	const language = detectLanguage(languages) ?? DEFAULT_LANGUAGE;

	yield put(setLanguage(language));
	yield put(changeLanguageBundle(language));

	const router: AppRouter = yield getContext("router");
	const location = (yield select(selectLocation)) as ReturnType<
		typeof selectLocation
	>;

	if (location) {
		const next = replaceLocationLanguage(location, language, languages);
		const current = `${location.pathname}${location.search}${location.hash}`;
		if (next !== current) {
			router.navigate(next);
		}
	}
}

export function* initI18nSaga() {
	yield takeEvery(appDataLoaded.match, worker);
}
