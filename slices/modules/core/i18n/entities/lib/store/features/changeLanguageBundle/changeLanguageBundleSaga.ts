import { retry, takeEvery } from "redux-saga/effects";
import {
	DEFAULT_LANGUAGE,
	i18n,
	i18nNamespace,
} from "@/modules/core/i18n/shared/config";
import { getTranslationBundle } from "@/modules/core/i18n/shared/lib";
import { getStoryI18nNamespace } from "@/modules/story/shared/lib";
import { ArkhamDividerAPI } from "@/shared/api";
import type { ReturnAwaited } from "@/shared/model";
import { seconds } from "@/shared/util";
import { changeLanguageBundle } from "./changeLanguageBundle";

const { getTranslations } = ArkhamDividerAPI;

function* worker({ payload }: ReturnType<typeof changeLanguageBundle>) {
	if (payload === DEFAULT_LANGUAGE) {
		return;
	}

	const times = 3;

	const translations: ReturnAwaited<typeof getTranslations> = yield retry(
		times,
		seconds(1),
		getTranslations,
		payload,
	);

	const bundle = getTranslationBundle(translations);

	i18n.addResourceBundle(payload, i18nNamespace.default, bundle, true, false);

	for (const [code, mapping] of Object.entries(translations.custom)) {
		if (!mapping) {
			continue;
		}
		const namespace = getStoryI18nNamespace(code);

		i18n.addResourceBundle(payload, namespace, mapping, true, false);
	}

	i18n.changeLanguage(payload);
}

export function* changeLanguageBundleSaga() {
	yield takeEvery(changeLanguageBundle.match, worker);
}
