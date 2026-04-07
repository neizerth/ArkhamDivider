import type { StoryScenario } from "../../../model";

export const getScenarioEncounterSets = (scenario: StoryScenario) => {
	const { encounter_sets = [], extra_encounter_sets = [] } = scenario;

	return [...encounter_sets, ...extra_encounter_sets];
};
