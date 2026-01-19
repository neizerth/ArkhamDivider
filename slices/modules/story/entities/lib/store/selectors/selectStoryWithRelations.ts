import { createSelector } from "@reduxjs/toolkit";
import { selectEncounterSets } from "@/modules/encounterSet/shared/lib";
import { selectStory } from "@/modules/story/shared/lib";
import type { StoryWithRelations } from "@/modules/story/shared/model";
import { getStoryWithRelations } from "../../logic";

export const selectStoryWithRelations = createSelector(
	[selectStory, selectEncounterSets],
	(story, encounterSets): StoryWithRelations | null => {
		if (!story || !encounterSets) {
			return null;
		}
		return getStoryWithRelations({ story, encounterSets });
	},
);
