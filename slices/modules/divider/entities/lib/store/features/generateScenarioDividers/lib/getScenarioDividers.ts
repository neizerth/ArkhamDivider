import { ascend, prop, sortWith } from "ramda";
import { v4 } from "uuid";
import type { Divider } from "@/modules/divider/shared/model";
import { getScenarioCards } from "@/modules/story/entities/lib";
import { getStoryScenarios } from "@/modules/story/shared/lib";
import type {
	StoryScenarioWithRelations,
	StoryWithRelations,
} from "@/modules/story/shared/model";

type Optons = {
	story: StoryWithRelations;
	exceptEncounterCards?: boolean;
	includeReturnStory?: boolean;
};

export const getScenarioDividers = ({
	story,
	exceptEncounterCards = false,
	includeReturnStory = false,
}: Optons) => {
	const sortFilter = ascend<StoryScenarioWithRelations>(
		({ number = Infinity }) => number,
	);

	const baseScenarios = getStoryScenarios(story);
	const returnScenarios = story.returnStory
		? getStoryScenarios(story.returnStory)
		: [];

	const scenarios = includeReturnStory
		? [...baseScenarios, ...returnScenarios]
		: baseScenarios;

	const sortedScenarios = sortWith([sortFilter], scenarios);

	const returnScenarioCodes = returnScenarios.map(prop("id"));

	const getScenarioStoryCode = (scenario: StoryScenarioWithRelations) => {
		if (returnScenarioCodes.includes(scenario.id)) {
			return story.returnStory?.code ?? story.code;
		}

		return story.code;
	};

	return sortedScenarios.map((scenario): Divider => {
		const title = scenario.scenario_name;

		const params = {
			scenario,
			cardTypes: exceptEncounterCards ? "scenario" : "all",
		} as const;

		const cards = getScenarioCards(params);
		const cardsCount = cards.reduce((total, { size }) => total + size, 0);

		const { icon } = scenario;

		const storyCode = getScenarioStoryCode(scenario);

		return {
			id: v4(),
			type: "scenario",
			side: "front",
			title,
			icon,
			cardsCount,
			cards,
			storyCode,
		};
	});
};
