import { I18N_NAMESPACE } from "@/constants/i18n";
import { I18NLanguageBundle } from "@/types/i18n";
import i18next from "i18next";

export const hasResourceBundle = (language: string, ns = I18N_NAMESPACE.DEFAULT) => 
  i18next.hasResourceBundle(language, ns);

export const addResourceBundle = (language: string, bundle: I18NLanguageBundle, ns = I18N_NAMESPACE.DEFAULT, deep = true, overwrite = true) => {
  i18next.addResourceBundle(language, ns, bundle, deep, overwrite);
}

export const setI18NLanguage = (language: string) => i18next.changeLanguage(language);

export const createTranslation = (ns = I18N_NAMESPACE.DEFAULT, language: string | null = null) => i18next.getFixedT(language, ns);

export const getLanguage = () => i18next.language;