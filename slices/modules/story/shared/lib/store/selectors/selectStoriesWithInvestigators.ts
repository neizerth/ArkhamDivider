import { createSelector } from "@reduxjs/toolkit";
import { selectStories } from "../stories";

export const selectStoriesWithInvestigators = createSelector(
	[selectStories],
	(stories) => {
		return stories.filter((story) => story.investigators.length > 0);
	},
);
