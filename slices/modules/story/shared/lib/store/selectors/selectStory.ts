import { createSelector } from "@reduxjs/toolkit";
import { selectStories } from "../stories";
import { selectStoryCode } from "../story";

export const selectStory = createSelector(
	[selectStories, selectStoryCode],
	(stories, storyCode) => {
		return stories.find((story) => story.code === storyCode);
	},
);
