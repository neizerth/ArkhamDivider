import { createInstance } from 'i18next';
import { initReactI18next } from 'react-i18next';

export const DEFAULT_LANGUAGE = 'en';

export const I18N_NAMESPACE = {
  DEFAULT: 'core',
  CUSTOM: 'custom',
};

export const CHINA_LANGUAGES = ['zh', 'zh-cn'];

const i18n = createInstance();

i18n.use(initReactI18next).init({
  fallbackLng: DEFAULT_LANGUAGE,
  defaultNS: I18N_NAMESPACE.DEFAULT,
  react: {
    bindI18n: 'added loaded languageChanged',
    bindI18nStore: 'added',
  },
});

export default i18n;
