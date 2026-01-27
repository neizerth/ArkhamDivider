import type { CardType } from "@/shared/model";
import type { EncounterSet } from "../../model";

type Options = {
	encounterSet: EncounterSet;
	cardTypes?: CardType[];
	exceptTypes?: CardType[];
};

export const getEncounterSetCardsCount = ({
	encounterSet,
	cardTypes = [],
	exceptTypes = [],
}: Options): number | undefined => {
	if (!encounterSet.types) {
		return encounterSet.size;
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

	return encounterSetTypes.reduce((total, { size }) => total + size, 0);
};
