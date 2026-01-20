import { createSelector } from "@reduxjs/toolkit";
import { selectEncounterSets } from "@/modules/encounterSet/shared/lib";
import { selectStories, selectStoryCode } from "@/modules/story/shared/lib";
import type { StoryWithRelations } from "@/modules/story/shared/model";
import { createStoryWithRelations } from "../../logic";

export const selectStoryWithRelations = createSelector(
	[selectStoryCode, selectStories, selectEncounterSets],
	(storyCode, stories, encounterSets): StoryWithRelations | null => {
		if (!storyCode || !encounterSets) {
			return null;
		}

		return (
			createStoryWithRelations({
				code: storyCode,
				stories,
				encounterSets,
			}) ?? null
		);
	},
);
