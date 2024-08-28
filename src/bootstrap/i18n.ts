import { I18N_NAMESPACE, DEFAULT_LANGUAGE } from "@/constants/i18n";
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";

i18n
.use(initReactI18next)
.init({
    fallbackLng: DEFAULT_LANGUAGE,
    defaultNS: I18N_NAMESPACE.DEFAULT,
    react: {
        bindI18n: 'added loaded languageChanged',
        bindI18nStore: 'added',
    }
});