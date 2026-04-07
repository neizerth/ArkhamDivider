import type { CardType } from "@/shared/model";
import type { EncounterSet, EncounterSetTypeEntry } from "../../model";

export type GetEncounterSetCardsOptions = {
	encounterSet: EncounterSet;
	cardTypes?: CardType[];
	exceptTypes?: CardType[];
};

export const getEncounterSetCards = (
	options: GetEncounterSetCardsOptions,
): EncounterSetTypeEntry[] => {
	const { encounterSet, cardTypes = [], exceptTypes = [] } = options;

	if (!encounterSet.types) {
		return [];
	}

	const encounterTypes =
		exceptTypes.length > 0
			? encounterSet.types.filter(
					({ type }) => !exceptTypes.includes(type as CardType),
				)
			: encounterSet.types;

	const encounterSetTypes =
		cardTypes.length > 0
			? encounterTypes.filter(({ type }) =>
					cardTypes.includes(type as CardType),
				)
			: encounterTypes;

	return encounterSetTypes.filter(({ size }) => size > 0);
};
