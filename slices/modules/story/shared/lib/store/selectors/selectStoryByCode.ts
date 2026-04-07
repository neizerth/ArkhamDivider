import { createSelector } from "@reduxjs/toolkit";
import { propEq } from "ramda";
import type { RootState } from "@/shared/store";
import { selectStories } from "../stories";

export const selectStoryByCode = createSelector(
	[selectStories, (_: RootState, code?: string) => code],
	(stories, code) => {
		return stories.find(propEq(code, "code"));
	},
);
