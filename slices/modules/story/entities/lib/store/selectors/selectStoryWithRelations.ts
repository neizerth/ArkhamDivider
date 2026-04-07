import { createSelector } from "@reduxjs/toolkit";
import { selectEncounterSets } from "@/modules/encounterSet/shared/lib";
import { selectReturnStory, selectStory } from "@/modules/story/shared/lib";
import type { StoryWithRelations } from "@/modules/story/shared/model";
import { getStoryWithRelations } from "../../logic";

export const selectStoryWithRelations = createSelector(
	[selectStory, selectReturnStory, selectEncounterSets],
	(story, returnStory, encounterSets): StoryWithRelations | null => {
		return getStoryWithRelations({ story, returnStory, encounterSets });
	},
);
