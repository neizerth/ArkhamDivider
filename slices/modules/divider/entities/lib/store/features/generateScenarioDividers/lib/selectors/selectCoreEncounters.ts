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
			// scenario_encounter_sets too — core's arkham/torch/tentacles are reused as extras.
			acc[chapter] = uniq([
				...encounters,
				...story.encounter_sets,
				...story.scenario_encounter_sets,
			]);
			return acc;
		}, {} as CoreEncounters);
	},
);
