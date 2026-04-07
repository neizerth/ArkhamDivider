import type { ArkhamDivider } from "arkham-divider-data";

export const getTranslationBundle = (
	translation: ArkhamDivider.Translation,
) => {
	const {
		encounterSets,
		campaigns,
		scenarios,
		stories,
		common,
		investigators,
	} = translation;

	return {
		...encounterSets,
		...campaigns,
		...scenarios,
		...stories,
		...common,
		...investigators,
	};
};
