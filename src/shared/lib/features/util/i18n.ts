import { I18N_NAMESPACE } from "@/shared/config/i18n";
import { I18NLanguageBundle } from "@/shared/types/i18n";
import i18n from "@/shared/config/i18n";

export const hasResourceBundle = (
	language: string,
	ns = I18N_NAMESPACE.DEFAULT,
) => i18n.hasResourceBundle(language, ns);

export const addResourceBundle = (
	language: string,
	bundle: I18NLanguageBundle,
	ns = I18N_NAMESPACE.DEFAULT,
	deep = true,
	overwrite = true,
) => {
	i18n.addResourceBundle(language, ns, bundle, deep, overwrite);
};

export const setI18NLanguage = (language: string) =>
	i18n.changeLanguage(language);

export const createTranslation = (
	ns = I18N_NAMESPACE.DEFAULT,
	language: string | null = null,
) => i18n.getFixedT(language, ns);

export const getLanguage = () => i18n.language;

export const getStoryNS = (code: string) => `story.${code}`;
