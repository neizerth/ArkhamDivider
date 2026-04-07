import { useMemo } from "react";
import { selectEncounterSets } from "@/modules/encounterSet/shared/lib";
import type { StoryScenario } from "@/modules/story/shared/model";
import { useAppSelector } from "@/shared/lib/hooks";
import { getScenarioEncounterSetGroups } from "../logic";

export const useScenarioEncounterSetGroups = (scenario: StoryScenario) => {
	const encounterSets = useAppSelector(selectEncounterSets);

	return useMemo(
		() =>
			getScenarioEncounterSetGroups({
				scenario,
				encounterSets,
			}),
		[scenario, encounterSets],
	);
};
