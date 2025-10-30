import type { TOptions } from "i18next";
import { omit } from "ramda";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import type { Story } from "../../model";
import { getStoryNS } from "../logic";

const omitNS = omit(["ns"]);

export type UseStoryTranslateFunction = (
	text: string,
	options?: TOptions,
) => string;

export const useStoryTranslation = (story?: Story) => {
	const storyNs = story && getStoryNS(story.code);

	const i18n = useTranslation();

	const translate: UseStoryTranslateFunction = useCallback(
		(text: string, options: TOptions = {}) => {
			const translation = i18n.t(text, omitNS(options));
			const { ns = storyNs } = options;

			if (translation && translation !== text) {
				return translation;
			}

			if (!ns) {
				return text;
			}

			return i18n.t(text, {
				...options,
				ns,
			});
		},
		[i18n, storyNs],
	);

	const translateStory = useCallback(
		(text: string, story?: Story) =>
			translate(text, {
				ns: story && getStoryNS(story.code),
			}),
		[translate],
	);

	return {
		...i18n,
		t: translate,
		translateStory,
	};
};
