import { uniq } from "ramda";
import type { Story } from "@/modules/story/shared/model";

type Options = {
	story: Story;
	includeReturnStory?: boolean;
};

export const getEncounterSetDividersCount = (options: Options) => {
	const { story, includeReturnStory } = options;

	const {
		encounter_sets,
		scenario_encounter_sets,
		return_encounter_sets = [],
		return_scenario_encounter_sets = [],
	} = story;

	const encounters = includeReturnStory
		? [...encounter_sets, ...return_encounter_sets]
		: encounter_sets;

	const scenarios = includeReturnStory
		? [...scenario_encounter_sets, ...return_scenario_encounter_sets]
		: scenario_encounter_sets;

	const encounterSetOnly = uniq(encounters).filter(
		(code) => !scenarios.includes(code),
	);

	return encounterSetOnly.length;
};
