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
	const { ns = fallbackNamespace } = options;

	// i18n `t` / `exists` overloads expect `context?: string`, while `TOptions` types `context` as `unknown`.
	const { context, ...rest } = options;
	const contextOpt = typeof context === "string" ? { context } : {};

	// Prefer network-loaded custom story content (`story.${code}`) when present.
	if (ns && i18nInstance.exists(text, { ns, ...contextOpt })) {
		return i18nInstance.t(text, {
			...rest,
			ns,
			...contextOpt,
		});
	}

	return i18nInstance.t(text, {
		...omit(["ns"], rest),
		...contextOpt,
	});
};
