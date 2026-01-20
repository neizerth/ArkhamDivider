import { isNotNil } from "ramda";
import type { EncounterSet } from "@/modules/encounterSet/shared/model";
import { getStoryScenarios } from "@/modules/story/shared/lib/logic/getStoryScenarios";
import type {
	Story,
	StoryScenario,
	StoryScenarioWithRelations,
	StoryWithRelations,
} from "@/modules/story/shared/model";

type Options = {
	story: Story;
	returnStory?: StoryWithRelations;
	encounterSets: EncounterSet[];
};

export const getStoryWithRelations = ({
	story,
	returnStory,
	encounterSets: allEncounterSets,
}: Options): StoryWithRelations => {
	const mapScenario = (
		scenario: StoryScenario,
	): StoryScenarioWithRelations | undefined => {
		if (!scenario) {
			return;
		}
		const encounterSets = allEncounterSets.filter(({ code }) =>
			scenario.encounter_sets?.includes(code),
		);
		const extraEncounterSets = allEncounterSets.filter(({ code }) =>
			scenario.extra_encounter_sets?.includes(code),
		);
		const encounterSet = allEncounterSets.find(
			({ icon }) => icon === scenario.icon,
		);
		return {
			...scenario,
			encounterSets,
			extraEncounterSets,
			encounterSet,
		};
	};

	const encounterSets = allEncounterSets.filter(({ code }) =>
		story.encounter_sets.includes(code),
	);
	const extraEncounterSets = allEncounterSets.filter(({ code }) =>
		story.extra_encounter_sets.includes(code),
	);

	const scenarios = getStoryScenarios(story)
		.map((scenario) => mapScenario(scenario))
		.filter(isNotNil);

	return {
		...story,
		encounterSets,
		extraEncounterSets,
		scenarios,
		returnStory,
	};
};
