import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import type { Story } from "../../model";

const storyAdapter = createEntityAdapter<Story>({
	sortComparer: (a, b) => a.code.localeCompare(b.code),
});

const selectors = storyAdapter.getSelectors();

const initialState = storyAdapter.getInitialState();

export const stories = createSlice({
	name: "stories",
	initialState,
	reducers: {
		setStories: storyAdapter.setAll,
	},
	selectors: {
		selectStories: selectors.selectAll,
		selectStoryById: selectors.selectById,
	},
});

export const { setStories } = stories.actions;

export const { selectStories, selectStoryById } = stories.selectors;

export default stories.reducer;
