import { createSelector } from "@reduxjs/toolkit";
import { selectScenarioParams } from "@/modules/divider/shared/lib";
import { selectStory } from "@/modules/story/shared/lib";
import { getCampaignDividersCount } from "../../../logic";

export const selectCampaignDividersCount = createSelector(
	[selectStory, selectScenarioParams],
	(story, params) => {
		if (!story) {
			return;
		}

		return getCampaignDividersCount({
			story,
			includeReturnStory: params.returnSet,
		});
	},
);
