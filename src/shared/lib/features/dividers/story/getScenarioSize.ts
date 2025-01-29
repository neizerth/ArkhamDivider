import { safePropEq } from "@/shared/lib/features/util/criteria";
import { SCENARIO_TYPES } from "@/shared/lib/store/features/encounterSets/constants";
import type { IEncounterSet, IScenario } from "@/shared/model/types/api";

export const getScenarioSize = ({
	scenario,
	encounterSets,
	includeScenarioSize,
	includeScenarioEncounterSet,
}: {
	scenario: IScenario;
	includeScenarioSize: boolean;
	includeScenarioEncounterSet: boolean;
	encounterSets: IEncounterSet[];
}) => {
	if (!includeScenarioSize) {
		return {};
	}
	const { icon } = scenario;
	const encounter = encounterSets.find(safePropEq(icon, "icon"));

	if (!encounter?.types || !includeScenarioEncounterSet) {
		return {
			size: encounter?.size,
		};
	}

	const { types } = encounter;

	const size = types
		.filter(({ type }) => SCENARIO_TYPES.includes(type))
		.reduce((total, { size }) => total + size, 0);

	return {
		size,
		totalSize: encounter.size,
	};
};
