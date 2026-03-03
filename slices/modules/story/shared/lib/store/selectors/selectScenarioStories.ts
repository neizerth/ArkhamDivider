import { createSelector } from "@reduxjs/toolkit";
import { selectStories } from "../stories";

export const selectScenarioStories = createSelector(
	[selectStories],
	(stories) => {
		return stories.filter((story) => story.type !== "investigators");
	},
);
