import type { i18n, TOptions } from "i18next";
import { i18n as defaultI18n } from "@/modules/core/i18n/shared/config";
import type { Story } from "../../model";
import { getStoryI18nNamespace } from "./i18n";
import { translateFallback } from "./translateFallback";

export type TranslateStoryOptions = {
	text?: string;
	i18nInstance?: i18n;
	story?: Story;
	options?: TOptions;
};

export const translateStory = ({
	i18nInstance = defaultI18n,
	text = "",
	story,
	options: tOptions,
}: TranslateStoryOptions) => {
	const ns = story && getStoryI18nNamespace(story.code);

	const options = { ...tOptions, ns };

	return translateFallback({ i18nInstance, text, options });
};
