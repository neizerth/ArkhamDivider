import { call, takeEvery } from "redux-saga/effects";
import {
	DEFAULT_LANGUAGE,
	i18n,
	i18nNamespace,
} from "@/modules/core/i18n/shared/config";
import { getTranslationBundle } from "@/modules/core/i18n/shared/lib";
import { ArkhamDividerAPI } from "@/shared/api";
import type { ReturnAwaited } from "@/shared/model";
import { changeLanguageBundle } from "./changeLanguageBundle";

const { getTranslations } = ArkhamDividerAPI;

function* worker({ payload }: ReturnType<typeof changeLanguageBundle>) {
	if (payload === DEFAULT_LANGUAGE) {
		return;
	}

	const translations: ReturnAwaited<typeof getTranslations> = yield call(
		getTranslations,
		payload,
	);

	const bundle = getTranslationBundle(translations);

	i18n.addResourceBundle(payload, i18nNamespace.default, bundle, true, false);
	i18n.changeLanguage(payload);
}

export function* changeLanguageBundleSaga() {
	yield takeEvery(changeLanguageBundle.match, worker);
}
