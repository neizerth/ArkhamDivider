import { createSelector } from "@reduxjs/toolkit";
import { selectStories } from "../stories";

export const selectSupportedStories = createSelector(
	[selectStories],
	(stories) => {
		return stories.filter((story) => story.supported === true);
	},
);
