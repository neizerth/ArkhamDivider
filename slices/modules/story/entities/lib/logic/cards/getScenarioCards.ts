import { getEncounterSetCards } from "@/modules/encounterSet/shared/lib/logic";
import { scenarioCardTypes } from "@/modules/story/shared/config";
import type { StoryScenarioWithRelations } from "@/modules/story/shared/model";

export type GetScenarioCardsOptions = {
	scenario: StoryScenarioWithRelations;
	cardTypes: "encounter" | "scenario" | "all";
};

export const getScenarioCards = (options: GetScenarioCardsOptions) => {
	const { encounterSet } = options.scenario;
	if (!encounterSet) {
		return [];
	}

	const cardTypes = options.cardTypes === "scenario" ? scenarioCardTypes : [];
	const exceptTypes =
		options.cardTypes === "encounter" ? scenarioCardTypes : [];

	return getEncounterSetCards({
		encounterSet,
		cardTypes,
		exceptTypes,
	});
};
