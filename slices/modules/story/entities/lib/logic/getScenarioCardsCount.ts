import { getEncounterSetCardsCount } from "@/modules/encounterSet/shared/lib/logic";
import { storyCardTypes } from "@/modules/story/shared/config";
import type { StoryScenarioWithRelations } from "@/modules/story/shared/model";

type Options = {
	scenario: StoryScenarioWithRelations;
	onlyEncounterSet: boolean;
};

export const getScenarioCardsCount = ({
	scenario,
	onlyEncounterSet = false,
}: Options): number | undefined => {
	const { encounterSet } = scenario;
	if (!encounterSet) {
		return;
	}

	const types = onlyEncounterSet ? storyCardTypes : [];

	return getEncounterSetCardsCount({
		encounterSet,
		types,
	});
};
