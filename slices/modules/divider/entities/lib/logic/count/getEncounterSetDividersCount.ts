import { isNotNil, uniq } from "ramda";
import type { StoryWithRelations } from "@/modules/story/shared/model";

type Options = {
	story: StoryWithRelations;
	includeReturnStory?: boolean;
};

export const getEncounterSetDividersCount = (options: Options) => {
	const { story, includeReturnStory } = options;

	const returnStory = includeReturnStory ? story.returnStory : null;

	const scenarios = includeReturnStory
		? [...story.scenarios, ...(returnStory?.scenarios ?? [])]
		: story.scenarios;

	const baseEncounters = uniq([
		...story.encounter_sets,
		...(returnStory?.encounter_sets ?? []),
	]);

	const scenarioCodes = uniq(
		scenarios.map((s) => s.encounterSet?.code).filter(isNotNil),
	);

	const encounterSetOnly = baseEncounters.filter(
		(code) => !scenarioCodes.includes(code),
	);

	return encounterSetOnly.length;
};
