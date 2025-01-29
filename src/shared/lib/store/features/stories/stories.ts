import {
	createSliceSelector,
	createSliceSetter,
} from "@/shared/lib/features/util/slice";
import type { IStory } from "@/shared/model/types/api";
import { createSlice } from "@reduxjs/toolkit";

export type IStoriesState = {
	list: IStory[];
};

const initialState: IStoriesState = {
	list: [],
};

export const stories = createSlice({
	name: "stories",
	initialState,
	reducers: {
		setStories: createSliceSetter("list"),
	},
	selectors: {
		selectStories: createSliceSelector("list"),
	},
});

export const { setStories } = stories.actions;

export const { selectStories } = stories.selectors;

export default stories.reducer;
