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

	const scenarios = includeReturnStory
		? [...story.scenarios, ...(returnStory?.scenarios ?? [])]
		: story.scenarios;

	const baseEncounters = uniqSets([
		...story.encounterSets,
		...(returnStory?.encounterSets ?? []),
	]);

	const extraEncounters = uniqSets([
		...story.extraEncounterSets,
		...(returnStory?.extraEncounterSets ?? []),
	]);

	/**
	 * "Scenario encounter sets" here mean the *main* encounter set for the scenario
	 * (picked by scenario icon), to avoid duplicating the same code as both:
	 * - encounter-set divider (from `story.encounterSets`)
	 * - scenario-encounter divider (from `scenarios`)
	 */
	const scenarioEncounters = uniqSets(
		compact(scenarios.map(prop("encounterSet"))),
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

		const isExtra = extraEncounters.some(propEq(encounterSet.code, "code"));

		const packCode = encounterSet.pack_code ?? "";
		const cycleCode = encounterSet.cycle_code ?? "";

		return {
			id: v4(),
			side: "front",
			layoutType: "scenario",
			type: "encounter",
			subtype: "encounter-set",
			encounterCode: encounterSet.code,
			packCode,
			cycleCode,
			isExtra,
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

	const scenarioEncounterSetDividers = scenarios.map((scenario): Divider => {
		const title = scenario.scenario_name;

		const cards = getScenarioCards({
			scenario,
			cardTypes: "encounter",
		});

		const cardsCount = cards.reduce((total, { size }) => total + size, 0);
		const { icon } = scenario;

		const storyCode = getScenarioStoryCode(scenario);

		const isExtra =
			Boolean(scenario.encounterSet?.code) &&
			extraEncounters.some(propEq(scenario.encounterSet?.code, "code"));

		console.log({
			isExtra,
			scenario,
			extraEncounters,
		});

		const packCode = scenario.encounterSet?.pack_code ?? "";
		const cycleCode = scenario.encounterSet?.cycle_code ?? "";

		return {
			id: v4(),
			side: "front",
			layoutType: "scenario",
			type: "encounter",
			subtype: "scenario-encounter",
			scenarioId: scenario.id,
			packCode,
			cycleCode,
			isExtra,
			title,
			icon,
			cardsCount,
			cards,
			storyCode,
		};
	});

	if (!includeEncounterSets && includeScenarioEncounterSets) {
		return scenarioEncounterSetDividers;
	}

	return [...baseDividers, ...scenarioEncounterSetDividers];
};
