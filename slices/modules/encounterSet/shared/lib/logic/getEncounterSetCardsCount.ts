import type { CardType } from "@/shared/model";
import type { EncounterSet } from "../../model";

type Options = {
	encounterSet: EncounterSet;
	cardTypes?: CardType[];
	exceptTypes?: CardType[];
};

export const getEncounterSetCardsCount = ({
	encounterSet,
	cardTypes,
	exceptTypes = [],
}: Options): number | undefined => {
	if (!encounterSet.types) {
		return encounterSet.size;
	}

	const encounterTypes = encounterSet.types.filter(
		({ type }) => !exceptTypes.includes(type as CardType),
	);

	const encounterSetTypes = cardTypes
		? encounterTypes.filter(({ type }) => cardTypes.includes(type as CardType))
		: encounterTypes;

	return encounterSetTypes.reduce((total, { size }) => total + size, 0);
};
