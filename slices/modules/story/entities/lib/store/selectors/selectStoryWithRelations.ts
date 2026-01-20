import { createSelector } from "@reduxjs/toolkit";
import { propEq } from "ramda";
import { selectEncounterSets } from "@/modules/encounterSet/shared/lib";
import { selectStories, selectStoryCode } from "@/modules/story/shared/lib";
import type { StoryWithRelations } from "@/modules/story/shared/model";
import { getStoryWithRelations } from "../../logic";

export const selectStoryWithRelations = createSelector(
	[selectStoryCode, selectStories, selectEncounterSets],
	(storyCode, stories, encounterSets): StoryWithRelations | null => {
		if (!storyCode || !encounterSets) {
			return null;
		}
		const story = stories.find(propEq(storyCode, "code"));
		if (!story) {
			return null;
		}

		const returnStory = stories.find(
			({ code }) => story.return_to_code === code,
		);

		const returnStoryWithRelations =
			returnStory &&
			getStoryWithRelations({ story: returnStory, encounterSets });

		return getStoryWithRelations({
			story,
			returnStory: returnStoryWithRelations,
			encounterSets,
		});
	},
);
