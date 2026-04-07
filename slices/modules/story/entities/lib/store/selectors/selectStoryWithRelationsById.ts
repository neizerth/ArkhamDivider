import { createSelector } from "@reduxjs/toolkit";
import { selectEncounterSets } from "@/modules/encounterSet/shared/lib";
import { selectStoryById } from "@/modules/story/shared/lib";
import { selectStoryByCode } from "@/modules/story/shared/lib/store/selectors/selectStoryByCode";
import type { StoryWithRelations } from "@/modules/story/shared/model";
import type { RootState } from "@/shared/store";
import { getStoryWithRelations } from "../../logic";

export const selectStoryWithRelationsById = createSelector(
	[
		(state: RootState, id: string) => selectStoryById(state, id),
		(state: RootState, id: string) => {
			const story = selectStoryById(state, id);
			return selectStoryByCode(state, story?.return_to_code);
		},
		selectEncounterSets,
	],
	(story, returnStory, encounterSets): StoryWithRelations | null => {
		return getStoryWithRelations({ story, returnStory, encounterSets });
	},
);
