import { createSelector } from "@reduxjs/toolkit";
import { selectScenarioParams } from "@/modules/divider/shared/lib";
import {
	getStoryScenarios,
	selectReturnStory,
	selectStory,
} from "@/modules/story/shared/lib";

export const selectScenarioDividersCount = createSelector(
	[selectStory, selectReturnStory, selectScenarioParams],
	(story, returnStory, params) => {
		if (!story) {
			return;
		}
		const mainCount = getStoryScenarios(story).length;
		if (!returnStory || !params.returnSet) {
			return mainCount;
		}
		const returnCount = getStoryScenarios(returnStory).length;
		return mainCount + returnCount;
	},
);
