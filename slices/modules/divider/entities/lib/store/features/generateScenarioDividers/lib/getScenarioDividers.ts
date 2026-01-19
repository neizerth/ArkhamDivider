import { ascend, sortWith } from "ramda";
import { v4 } from "uuid";
import type {
	Divider,
	DividerCategory,
	DividerLayout,
} from "@/modules/divider/shared/model";
import { getScenarioCardsCount } from "@/modules/story/entities/lib";
import { getStoryScenarios } from "@/modules/story/shared/lib/logic/getStoryScenarios";
import type {
	StoryScenarioWithRelations,
	StoryWithRelations,
} from "@/modules/story/shared/model";

type Optons = {
	layout: DividerLayout;
	category: DividerCategory;
	story: StoryWithRelations;
	onlyEncounterSet?: boolean;
};

export const getScenarioDividers = ({
	story,
	layout,
	category,
	onlyEncounterSet = false,
}: Optons) => {
	const scenarios = getStoryScenarios(story);

	const sortFilter = ascend<StoryScenarioWithRelations>(
		({ number = Infinity }) => number,
	);
	const sortedScenarios = sortWith([sortFilter], scenarios);

	return sortedScenarios.map((scenario): Divider => {
		const { icon } = scenario;
		const title = scenario.scenario_name;

		const cardsCount = getScenarioCardsCount({
			scenario,
			onlyEncounterSet,
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
