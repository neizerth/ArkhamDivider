import type { LocaleConfig } from "../../model";

/** Returns config.default merged with config[language]. Type = default & overrides. */
export function getLocaleConfig<T>(language: string, config: LocaleConfig<T>) {
	if (!config[language]) {
		return config.default;
	}
	return {
		...config.default,
		...config[language],
	};
}
