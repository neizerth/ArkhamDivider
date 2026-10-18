import { isNotNil } from "ramda";
import {
	applyEncounterSetData,
	applyEncounterSetDataList,
} from "@/modules/encounterSet/shared/lib/logic";
import type { EncounterSet } from "@/modules/encounterSet/shared/model";
import { getStoryScenarios } from "@/modules/story/shared/lib";
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

export const mapStoryWithRelations = ({
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
		const { encounter_set_data } = scenario;
		const encounterSets = applyEncounterSetDataList(
			allEncounterSets.filter(({ code }) =>
				scenario.encounter_sets?.includes(code),
			),
			encounter_set_data,
		);
		const extraEncounterSets = applyEncounterSetDataList(
			allEncounterSets.filter(({ code }) =>
				scenario.extra_encounter_sets?.includes(code),
			),
			encounter_set_data,
		);
		const encounterSet = allEncounterSets.find(
			({ icon }) => icon === scenario.icon,
		);
		return {
			...scenario,
			encounterSets,
			extraEncounterSets,
			encounterSet: encounterSet
				? applyEncounterSetData(encounterSet, encounter_set_data)
				: undefined,
		};
	};

	const { encounter_set_data } = story;

	const encounterSets = applyEncounterSetDataList(
		allEncounterSets.filter(({ code }) => story.encounter_sets.includes(code)),
		encounter_set_data,
	);
	const scenarioEncounterSets = applyEncounterSetDataList(
		allEncounterSets.filter(({ code }) =>
			story.scenario_encounter_sets.includes(code),
		),
		encounter_set_data,
	);
	const extraEncounterSets = applyEncounterSetDataList(
		allEncounterSets.filter(({ code }) =>
			story.extra_encounter_sets.includes(code),
		),
		encounter_set_data,
	);

	const scenarios = getStoryScenarios(story)
		.map((scenario) => mapScenario(scenario))
		.filter(isNotNil);

	return {
		...story,
		encounterSets,
		scenarioEncounterSets,
		extraEncounterSets,
		scenarios,
		returnStory,
	};
};
