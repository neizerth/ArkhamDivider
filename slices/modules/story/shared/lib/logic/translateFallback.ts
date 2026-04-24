import type { i18n, TOptions } from "i18next";
import { omit } from "ramda";
import { i18n as defaultI18n } from "@/modules/core/i18n/shared/config";

type Options = {
	i18nInstance?: i18n;
	text?: string;
	fallbackNamespace?: string;
	options: TOptions;
};

export const translateFallback = ({
	i18nInstance = defaultI18n,
	text = "",
	fallbackNamespace,
	options,
}: Options) => {
	const translation = i18nInstance.t(text, omit(["ns"], options));
	const { ns = fallbackNamespace } = options;

	if (translation && translation !== text) {
		return translation;
	}

	if (!ns) {
		return text;
	}

	// i18n `t` overloads expect `context?: string`, while `TOptions` types `context` as `unknown`.
	const { context, ...rest } = options;
	return i18nInstance.t(text, {
		...rest,
		ns,
		...(typeof context === "string" ? { context } : {}),
	});
};
