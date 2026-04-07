import { prop, propEq, uniqBy } from "ramda";
import { compact } from "ramda-adjunct";
import { v4 } from "uuid";
import type { Divider } from "@/modules/divider/shared/model";
import { getEncounterSetCards } from "@/modules/encounterSet/shared/lib/logic";
import type { EncounterSet } from "@/modules/encounterSet/shared/model";
import { getScenarioCards } from "@/modules/story/entities/lib";
import type {
	StoryScenarioWithRelations,
	StoryWithRelations,
} from "@/modules/story/shared/model";
import { getSpecialEncounterSetDividers } from "./getSpecialEncounterSetDividers";

export type GetEncounterSetDividersOptions = {
	story: StoryWithRelations;
	includeReturnStory: boolean;
	includeExtraEncounterSets: boolean;
	includeScenarioEncounterSets: boolean;
	includeEncounterSets: boolean;
};

const uniqSets = (sets: EncounterSet[]) => uniqBy(prop("code"), compact(sets));

export const getEncounterSetDividers = (
	options: GetEncounterSetDividersOptions,
) => {
	const {
		story,
		includeEncounterSets = false,
		includeReturnStory = false,
		includeScenarioEncounterSets = false,
		includeExtraEncounterSets = false,
	} = options;

	const specialDividers = getSpecialEncounterSetDividers(options);

	const returnStory = includeReturnStory ? story.returnStory : null;

	const baseEncounters = uniqSets([
		...story.encounterSets,
		...(returnStory?.encounterSets ?? []),
	]);

	const extraEncounters = uniqSets([
		...story.extraEncounterSets,
		...(returnStory?.extraEncounterSets ?? []),
	]);

	const scenarioEncounters = uniqSets(
		compact([
			...story.scenarios.map(({ encounterSet }) => encounterSet),
			...(returnStory?.scenarios?.map(({ encounterSet }) => encounterSet) ??
				[]),
		]),
	);

	const scenarioEncounterCodes = scenarioEncounters.map(prop("code"));

	const uniqEncounters = uniqSets([
		...baseEncounters,
		...(includeExtraEncounterSets ? extraEncounters : []),
	]);

	const encounters = uniqEncounters.filter((encounter) => {
		const isScenario = scenarioEncounterCodes.includes(encounter.code);

		if (!includeScenarioEncounterSets && isScenario) {
			return false;
		}

		return true;
	});

	const returnEncounterSets = returnStory?.encounterSets ?? [];

	const getEncounterStoryCode = (code: string) => {
		if (returnEncounterSets.some(propEq(code, "code"))) {
			return returnStory?.code ?? story.code;
		}

		return story.code;
	};

	const ecnounterSetDividers = encounters.map((encounterSet): Divider => {
		const cards = getEncounterSetCards({ encounterSet });
		const cardsCount = cards.reduce((total, { size }) => total + size, 0);
		const { icon, name } = encounterSet;

		const storyCode = getEncounterStoryCode(encounterSet.code);

		return {
			id: v4(),
			side: "front",
			layoutType: "scenario",
			type: "encounter",
			title: name,
			icon,
			cardsCount,
			cards,
			storyCode,
		};
	});

	const baseDividers = [...ecnounterSetDividers, ...specialDividers];

	if (!includeScenarioEncounterSets && includeEncounterSets) {
		return baseDividers;
	}

	const returnScenarioCodes = returnStory?.scenarios.map(prop("id")) ?? [];

	const getScenarioStoryCode = (scenario: StoryScenarioWithRelations) => {
		if (returnScenarioCodes.includes(scenario.id)) {
			return returnStory?.code ?? story.code;
		}
		return story.code;
	};
	const scenarioEncounterSetDividers = story.scenarios.map(
		(scenario): Divider => {
			const title = scenario.scenario_name;

			const cards = getScenarioCards({
				scenario,
				cardTypes: "encounter",
			});

			const cardsCount = cards.reduce((total, { size }) => total + size, 0);
			const { icon } = scenario;

			const storyCode = getScenarioStoryCode(scenario);

			return {
				id: v4(),
				side: "front",
				layoutType: "scenario",
				type: "encounter",
				title,
				icon,
				cardsCount,
				cards,
				storyCode,
			};
		},
	);

	if (!includeEncounterSets && includeScenarioEncounterSets) {
		return scenarioEncounterSetDividers;
	}

	return [...baseDividers, ...scenarioEncounterSetDividers];
};
