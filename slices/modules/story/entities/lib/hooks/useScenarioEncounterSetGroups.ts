import { useMemo } from "react";
import { selectIcons } from "@/modules/core/icon/shared/lib";
import { selectEncounterSets } from "@/modules/encounterSet/shared/lib";
import type { StoryScenario } from "@/modules/story/shared/model";
import { useAppSelector } from "@/shared/lib/hooks";
import { getScenarioEncounterSetGroups } from "../logic";

export const useScenarioEncounterSetGroups = (scenario: StoryScenario) => {
	const encounterSets = useAppSelector(selectEncounterSets);
	const icons = useAppSelector(selectIcons);

	return useMemo(
		() =>
			getScenarioEncounterSetGroups({
				scenario,
				encounterSets,
				icons: Object.values(icons),
			}),
		[scenario, encounterSets, icons],
	);
};
