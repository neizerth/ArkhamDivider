import { prop, uniqBy } from "ramda";
import { compact } from "ramda-adjunct";
import { v4 } from "uuid";
import type { Divider } from "@/modules/divider/shared/model";
import { getEncounterSetCards } from "@/modules/encounterSet/shared/lib/logic";
import type { EncounterSet } from "@/modules/encounterSet/shared/model";
import { getScenarioCards } from "@/modules/story/entities/lib";
import type { StoryWithRelations } from "@/modules/story/shared/model";

type Options = {
	story: StoryWithRelations;
	includeReturnStory: boolean;
	includeExtraEncounterSets: boolean;
	includeScenarioEncounterSets: boolean;
};

const uniqSets = (sets: EncounterSet[]) => uniqBy(prop("code"), compact(sets));

export const getEncounterSetDividers = ({
	story,
	includeReturnStory = false,
	includeScenarioEncounterSets = false,
	includeExtraEncounterSets = false,
}: Options) => {
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

	const ecnounterSetDividers = encounters.map((encounterSet): Divider => {
		const cards = getEncounterSetCards({ encounterSet });
		const cardsCount = cards.reduce((total, { size }) => total + size, 0);
		return {
			id: v4(),
			side: "front",
			type: "encounter",
			title: encounterSet.name,
			icon: encounterSet.icon,
			cardsCount,
			cards,
			storyCode: story.code,
		};
	});

	if (!includeScenarioEncounterSets) {
		return ecnounterSetDividers;
	}

	const scenarioEncounterSetDividers = story.scenarios.map(
		(scenario): Divider => {
			const { icon } = scenario;
			const title = scenario.scenario_name;

			const cards = getScenarioCards({
				scenario,
				cardTypes: "encounter",
			});

			const cardsCount = cards.reduce((total, { size }) => total + size, 0);

			return {
				id: v4(),
				side: "front",
				type: "encounter",
				title,
				icon,
				cardsCount,
				cards,
				storyCode: story.code,
			};
		},
	);

	return [...ecnounterSetDividers, ...scenarioEncounterSetDividers];
};
