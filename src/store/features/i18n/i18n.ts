import { AppThunk } from "@/store";
import { I18NLanguageBundle } from "@/types/i18n";
import { ActionCreator } from "@reduxjs/toolkit";
import { addResourceBundle } from "@/util/i18n";

export const setTranslations = (ns?: string): ActionCreator<AppThunk> => (language: string, bundle: I18NLanguageBundle) => () => {
  addResourceBundle(language, bundle, ns);
}

export const setCoreTranslations = setTranslations();