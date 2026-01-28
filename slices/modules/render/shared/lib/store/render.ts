import { createSlice } from "@reduxjs/toolkit";
import { createSliceState } from "redux-toolkit-helpers";

export type RenderState = {
	dividerRenderId: string | null;
};

const initialState: RenderState = {
	dividerRenderId: null,
};

export const render = createSlice({
	name: "render",
	...createSliceState(initialState),
});

export const { setDividerRenderId } = render.actions;

export const { selectDividerRenderId } = render.selectors;

export default render.reducer;
