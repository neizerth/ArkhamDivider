import { createSelector } from "@reduxjs/toolkit";
import { isInvestigatorStory } from "../../criteria";
import { selectStories } from "../stories";

export const selectScenarioStories = createSelector(
	[selectStories],
	(stories) => {
		return stories.filter((story) => !isInvestigatorStory(story));
	},
);
