import type { TOptions } from "i18next";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import type { Story } from "../../model";
import {
	getStoryI18nNamespace,
	translateFallback,
	translateStory,
} from "../logic";

export type UseStoryTranslateFunction = (
	text: string,
	options?: TOptions,
) => string;

export const useStoryTranslation = (story?: Story) => {
	const storyNs = story && getStoryI18nNamespace(story.code);

	const i18n = useTranslation();
	const i18nInstance = i18n.i18n;

	const translate: UseStoryTranslateFunction = useCallback(
		(text: string, options: TOptions = {}) => {
			return translateFallback({
				i18nInstance,
				text,
				options,
				fallbackNamespace: storyNs,
			});
		},
		[storyNs, i18nInstance],
	);

	const translateStoryCallback = useCallback(
		(text?: string, story?: Story) => {
			return translateStory({
				i18nInstance,
				text,
				story,
			});
		},
		[i18nInstance],
	);

	return {
		...i18n,
		t: translate,
		translateStory: translateStoryCallback,
	};
};
