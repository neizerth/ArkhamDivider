import { AppThunk } from "@/store";
import { ActionCreator } from "@reduxjs/toolkit";
import { addResourceBundle } from "@/util/i18n";
import { Mapping } from "@/types/util";
import { I18NLanguageBundle } from "@/types/i18n";

export const setTranslations = (ns?: string): ActionCreator<AppThunk> => (language: string, bundle: I18NLanguageBundle) => () => {
  addResourceBundle(language, bundle, ns);
}

export const setCoreTranslations = setTranslations();

export const setCustomTranslations: ActionCreator<AppThunk> = (language: string, translations: Mapping<I18NLanguageBundle>) => () => {
  for (const [code, mapping] of Object.entries(translations)) {
    if (!mapping) {
      continue
    }
    const ns = `story.${code}`;

    addResourceBundle(language, mapping, ns);
  }
}