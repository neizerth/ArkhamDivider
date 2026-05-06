import { createSelector } from "@reduxjs/toolkit";
import { selectScenarioParams } from "@/modules/divider/shared/lib";
import { selectStoryWithRelations } from "@/modules/story/entities/lib";
import { getEncounterSetDividersCount } from "../../../logic";

export const selectEncounterSetDividersCount = createSelector(
	[selectStoryWithRelations, selectScenarioParams],
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
