import { createInstance, type Resource } from "i18next";
import { initReactI18next } from "react-i18next";
import { DEFAULT_LANGUAGE, i18nNamespace } from "./language";
import { translations } from "./translations";

export const i18n = createInstance();

const resources = Object.entries(translations).reduce((acc, [key, value]) => {
	acc[key] = {
		[i18nNamespace.default]: {
			...translations.en,
			...value,
		},
	};
	return acc;
}, {} as Resource);

i18n.use(initReactI18next).init({
	fallbackLng: DEFAULT_LANGUAGE,
	defaultNS: i18nNamespace.default,
	react: {
		bindI18n: "added loaded languageChanged",
		bindI18nStore: "added",
	},
	resources,
});
