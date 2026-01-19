import type { CardType } from "@/shared/model";
import type { EncounterSet } from "../../model";

type Options = {
	encounterSet: EncounterSet;
	types?: CardType[];
};

export const getEncounterSetCardsCount = ({
	encounterSet,
	types,
}: Options): number | undefined => {
	if (!encounterSet.types) {
		return encounterSet.size;
	}

	const encounterSetTypes = types
		? encounterSet.types.filter(({ type }) => types.includes(type as CardType))
		: encounterSet.types;

	return encounterSetTypes.reduce((total, { size }) => total + size, 0);
};
