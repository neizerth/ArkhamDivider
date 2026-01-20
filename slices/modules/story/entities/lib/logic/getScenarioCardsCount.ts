import { getEncounterSetCardsCount } from "@/modules/encounterSet/shared/lib/logic";
import { scenarioCardTypes } from "@/modules/story/shared/config";
import type { StoryScenarioWithRelations } from "@/modules/story/shared/model";

type Options = {
	scenario: StoryScenarioWithRelations;
	cardTypes: "encounter" | "scenario" | "all";
};

export const getScenarioCardsCount = (options: Options): number | undefined => {
	const { encounterSet } = options.scenario;
	if (!encounterSet) {
		return;
	}

	const cardTypes = options.cardTypes === "scenario" ? scenarioCardTypes : [];
	const exceptTypes =
		options.cardTypes === "encounter" ? scenarioCardTypes : [];

	return getEncounterSetCardsCount({
		encounterSet,
		cardTypes,
		exceptTypes,
	});
};
