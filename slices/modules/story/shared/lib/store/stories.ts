import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import type { Story } from "../../model";

const storyAdapter = createEntityAdapter({
	selectId: (story: Story) => story.code,
	sortComparer: (a: Story, b: Story) => a.code.localeCompare(b.code),
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
	},
});

export const { setStories } = stories.actions;

export const { selectStories } = stories.selectors;

export default stories.reducer;
