import { createSlice } from "@reduxjs/toolkit";
import { createSliceState } from "redux-toolkit-helpers";
import type { DividerLayoutType } from "../../model";

export type DividerState = {
	layoutId: string | null;
	categoryId: string | null;
	dividerType: DividerLayoutType | null;
};

const initialState: DividerState = {
	layoutId: null,
	categoryId: null,
	dividerType: null,
};

export const divider = createSlice({
	name: "divider",
	...createSliceState(initialState),
});

export const { setLayoutId, setCategoryId, setDividerType } = divider.actions;

export const { selectLayoutId, selectCategoryId, selectDividerType } =
	divider.selectors;

export default divider.reducer;
