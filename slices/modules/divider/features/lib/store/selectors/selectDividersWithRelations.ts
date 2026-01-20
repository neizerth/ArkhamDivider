import { createSelector } from "@reduxjs/toolkit";
import { selectEncounterSets } from "@/modules/encounterSet/shared/lib";
import { selectStories } from "@/modules/story/shared/lib";
import { selectDividers } from "../../../../shared/lib/store/dividers";
import { getDividersWithRelations } from "../../logic";

export const selectDividersWithRelations = createSelector(
	[selectDividers, selectStories, selectEncounterSets],
	(dividers, stories, encounterSets) => {
		return getDividersWithRelations({ dividers, stories, encounterSets });
	},
);
