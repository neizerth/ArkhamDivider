import { select, takeEvery } from "redux-saga/effects";
import { appTranslationsLoaded } from "@/modules/core/app/shared/lib";
import { i18n } from "../../shared/config";
import { i18nNamespace } from "../../shared/config/language";
import { translations } from "../../shared/config/translations";
import { selectCurrentLanguage } from "../../shared/lib/store";

function* worker({ payload }: ReturnType<typeof appTranslationsLoaded>) {
	const language: ReturnType<typeof selectCurrentLanguage> = yield select(
		selectCurrentLanguage,
	);

	if (!language) {
		return;
	}

	const translation = translations[language] ?? {};

	const {
		campaigns,
		scenarios,
		encounterSets,
		stories,
		investigators,
		common,
	} = payload;

	const mapping = {
		...encounterSets,
		...campaigns,
		...scenarios,
		...stories,
		...common,
		...translation,
		...investigators,
	};

	i18n.addResourceBundle(language, i18nNamespace.default, mapping, true, true);
}

export function* updateTranslationsSaga() {
	yield takeEvery(appTranslationsLoaded.match, worker);
}
