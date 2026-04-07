import { createSelector } from "@reduxjs/toolkit";
import { selectScenarioParams } from "@/modules/divider/shared/lib";
import { selectStory } from "@/modules/story/shared/lib";
import { getEncounterSetDividersCount } from "../../../logic";

export const selectEncounterSetDividersCount = createSelector(
	[selectStory, selectScenarioParams],
	(story, params) => {
		if (!story) {
			return;
		}

		return getEncounterSetDividersCount({
			story,
			includeReturnStory: params.returnSet,
		});
	},
);
