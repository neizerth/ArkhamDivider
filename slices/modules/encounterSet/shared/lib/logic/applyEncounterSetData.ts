import type { EncounterSet, EncounterSetData } from "../../model";

/**
 * Prefer story/scenario `encounter_set_data` over the global encounter set
 * when a set is only partially gathered. Keeps `types` so scenario vs
 * encounter card splits still work.
 */
export const applyEncounterSetData = (
	encounterSet: EncounterSet,
	dataList?: EncounterSetData[],
): EncounterSet => {
	const data = dataList?.find(({ code }) => code === encounterSet.code);
	if (!data) {
		return encounterSet;
	}

	return {
		...encounterSet,
		size: data.size,
		...(data.types ? { types: data.types } : {}),
	};
};

export const applyEncounterSetDataList = (
	encounterSets: EncounterSet[],
	dataList?: EncounterSetData[],
): EncounterSet[] =>
	encounterSets.map((encounterSet) =>
		applyEncounterSetData(encounterSet, dataList),
	);
