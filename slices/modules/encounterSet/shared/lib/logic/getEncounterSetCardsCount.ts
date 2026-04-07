import {
	type GetEncounterSetCardsOptions,
	getEncounterSetCards,
} from "./getEncounterSetCards";

type Options = GetEncounterSetCardsOptions;

export const getEncounterSetCardsCount = (options: Options): number => {
	return getEncounterSetCards(options).reduce(
		(total, { size }) => total + size,
		0,
	);
};
