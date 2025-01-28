import { createSlice } from "@reduxjs/toolkit";
import { IStory } from "@/shared/types/api";
import { createSliceState } from "redux-toolkit-helpers";

export type IStoriesState = {
	list: IStory[];
};

const initialState: IStoriesState = {
	list: [],
};

export const stories = createSlice({
	name: "stories",
	...createSliceState(initialState)
});

export const { 
	setList: setStories 
} = stories.actions;

export const { 
	selectList: selectStories 
} = stories.selectors;

export default stories.reducer;
