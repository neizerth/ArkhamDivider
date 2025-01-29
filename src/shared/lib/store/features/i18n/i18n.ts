import { AppThunk } from "@/shared/lib/store";
import { ActionCreator } from "@reduxjs/toolkit";
import { addResourceBundle, getStoryNS } from "@/shared/lib/features/util/i18n";
import { Mapping } from "@/shared/model/types/util";
import { I18NLanguageBundle } from "@/shared/model/types/i18n";

export const setTranslations =
	(ns?: string): ActionCreator<AppThunk> =>
	(language: string, bundle: I18NLanguageBundle) =>
	() => {
		addResourceBundle(language, bundle, ns);
	};

export const setCoreTranslations = setTranslations();

export const setCustomTranslations: ActionCreator<AppThunk> =
	(language: string, translations: Mapping<I18NLanguageBundle>) => () => {
		for (const [code, mapping] of Object.entries(translations)) {
			if (!mapping) {
				continue;
			}
			const ns = getStoryNS(code);

			addResourceBundle(language, mapping, ns);
		}
	};
