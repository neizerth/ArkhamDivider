import { isNotNil } from "ramda";
import type { EncounterSet } from "@/modules/encounterSet/shared/model";
import type {
	Story,
	StoryScenario,
	StoryScenarioWithRelations,
	StoryWithRelations,
} from "@/modules/story/shared/model";

type Options = {
	story: Story;
	encounterSets: EncounterSet[];
};
export const getStoryWithRelations = ({
	story,
	encounterSets: allEncounterSets,
}: Options): StoryWithRelations => {
	const mapScenario = (
		scenario?: StoryScenario,
	): StoryScenarioWithRelations | undefined => {
		if (!scenario) {
			return;
		}
		const encounterSets = allEncounterSets.filter(({ code }) =>
			scenario.encounter_sets?.includes(code),
		);
		const encounterSet = allEncounterSets.find(
			({ icon }) => icon === scenario.icon,
		);
		return {
			...scenario,
			encounterSets,
			encounterSet,
		};
	};

	const encounterSets = allEncounterSets.filter(({ code }) =>
		story.encounter_sets.includes(code),
	);

	return {
		...story,
		encounterSets,
		scenario: mapScenario(story.scenario),
		scenarios: story.scenarios?.map(mapScenario).filter(isNotNil),
	};
};
