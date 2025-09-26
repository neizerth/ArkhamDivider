import { createSlice } from "@reduxjs/toolkit";
import { createSliceState } from "redux-toolkit-helpers";

export type DividerState = {
	dividerVariant: string | null;
	dividerLayout: string | null;
};

const initialState: DividerState = {
	dividerVariant: null,
	dividerLayout: null,
};

export const divider = createSlice({
	name: "divider",
	...createSliceState(initialState),
});

export const { setDividerVariant, setDividerLayout } = divider.actions;

export const { selectDividerVariant, selectDividerLayout } = divider.selectors;

export default divider.reducer;
