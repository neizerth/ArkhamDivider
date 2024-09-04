import { I18N_NAMESPACE, DEFAULT_LANGUAGE } from "@/constants/i18n";
import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next";
import { resources } from '@/data/i18n';

const i18n = createInstance();

i18n
	.use(initReactI18next)
	.init({
		resources,
		fallbackLng: DEFAULT_LANGUAGE,
		defaultNS: I18N_NAMESPACE.DEFAULT,
		react: {
			bindI18n: 'added loaded languageChanged',
			bindI18nStore: 'added',
		}
	});

export default i18n;