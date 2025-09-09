import { createSlice } from "@reduxjs/toolkit";
import { createSliceState } from "redux-toolkit-helpers";
import type { Icon } from "../../model";

export type IconsState = {
	icons: Record<string, Icon>;
};

const initialState: IconsState = {
	icons: {},
};

export const icons = createSlice({
	name: "icons",
	...createSliceState(initialState),
});

export const { setIcons } = icons.actions;

export const { selectIcons } = icons.selectors;

export default icons.reducer;
