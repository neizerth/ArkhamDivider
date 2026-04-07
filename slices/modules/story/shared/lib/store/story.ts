import { createSlice } from "@reduxjs/toolkit";
import { createSliceState } from "redux-toolkit-helpers";

type StoryState = {
	storyCode: string | null;
};

const initialState: StoryState = {
	storyCode: null,
};

const state = createSliceState(initialState);

export const story = createSlice({
	name: "story",
	...state,
});

export const { setStoryCode } = story.actions;

export const { selectStoryCode } = story.selectors;

export default story.reducer;
