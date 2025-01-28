import { IEncounterSet } from "@/shared/types/api";
import { SCENARIO_TYPES } from "@/shared/store/features/encounterSets/constants";

export const getEncounterSize = ({
	encounter,
	includeEncounterSize,
	isExtra,
}: {
	encounter: IEncounterSet;
	includeEncounterSize: boolean;
	isExtra: boolean;
}) => {
	if (!includeEncounterSize || isExtra) {
		return {};
	}

	const { types } = encounter;

	if (!types) {
		return {
			size: encounter.size,
		};
	}

	const size = types
		.filter(({ type }) => !SCENARIO_TYPES.includes(type))
		.reduce((total, { size }) => total + size, 0);

	return { size };
};
