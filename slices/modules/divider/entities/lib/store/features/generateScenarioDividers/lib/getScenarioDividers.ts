import { ascend, sortWith } from "ramda";
import { v4 } from "uuid";
import type {
	Divider,
	DividerCategory,
	DividerLayout,
} from "@/modules/divider/shared/model";
import { getScenarioCardsCount } from "@/modules/story/entities/lib";
import type {
	StoryScenarioWithRelations,
	StoryWithRelations,
} from "@/modules/story/shared/model";

type Optons = {
	layout: DividerLayout;
	category: DividerCategory;
	story: StoryWithRelations;
	exceptEncounterCards?: boolean;
};

export const getScenarioDividers = ({
	story,
	layout,
	category,
	exceptEncounterCards = false,
}: Optons) => {
	const sortFilter = ascend<StoryScenarioWithRelations>(
		({ number = Infinity }) => number,
	);

	const sortedScenarios = sortWith([sortFilter], story.scenarios);

	return sortedScenarios.map((scenario): Divider => {
		const { icon } = scenario;
		const title = scenario.scenario_name;

		const cardsCount = getScenarioCardsCount({
			scenario,
			cardTypes: exceptEncounterCards ? "scenario" : "all",
		});

		return {
			id: v4(),
			type: "scenario",
			side: "front",
			layout,
			category,
			title,
			icon,
			cardsCount,
			story,
		};
	});
};
