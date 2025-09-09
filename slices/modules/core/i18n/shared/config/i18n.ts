import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next";
import { translations } from "../translations";
import { DEFAULT_LANGUAGE, i18nNamespace } from "./language";

export const i18n = createInstance();

i18n.use(initReactI18next).init({
	fallbackLng: DEFAULT_LANGUAGE,
	defaultNS: i18nNamespace.default,
	react: {
		bindI18n: "added loaded languageChanged",
		bindI18nStore: "added",
	},
	resources: {
		en: {
			[i18nNamespace.default]: translations.en,
		},
	},
});
