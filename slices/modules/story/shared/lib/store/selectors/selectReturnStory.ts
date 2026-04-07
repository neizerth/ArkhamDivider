import { createSelector } from "@reduxjs/toolkit";
import { selectStories } from "../stories";
import { selectStory } from "./selectStory";

export const selectReturnStory = createSelector(
	[selectStory, selectStories],
	(story, stories) => {
		if (!story) {
			return;
		}
		return stories.find(({ return_to_code }) => return_to_code === story.code);
	},
);
