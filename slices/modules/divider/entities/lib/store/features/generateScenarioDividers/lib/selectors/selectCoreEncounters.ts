import { createSelector } from "@reduxjs/toolkit";
import { uniq } from "ramda";
import { isCoreSet, selectStories } from "@/modules/story/shared/lib";

type CoreEncounters = Record<number, string[]>;
export const selectCoreEncounters = createSelector(
	[selectStories],
	(stories): CoreEncounters => {
		const coreStories = stories.filter(isCoreSet);

		return coreStories.reduce((acc, story) => {
			const chapter = story.chapter ?? 1;
			const encounters = acc[chapter] ?? [];
			acc[chapter] = uniq([...encounters, ...story.encounter_sets]);
			return acc;
		}, {} as CoreEncounters);
	},
);
