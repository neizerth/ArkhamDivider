import { ArkhamDivider } from "arkham-divider-data";
import { ActionCreator, createSlice } from "@reduxjs/toolkit";
import { AppThunk } from "@/shared/store";
import { Nullable } from "@/shared/types/util";
import { createSliceState } from "redux-toolkit-helpers";

export type Icons = ArkhamDivider.Core["icons"];

export type IIconsState = {
	icons: Icons;
	popupIcon: Nullable<{
		default?: string;
		current?: string;
	}>;
};

const initialState: IIconsState = {
	icons: [],
	popupIcon: null,
};

export const icons = createSlice({
	name: "icons",
	...createSliceState(initialState)
});

export const clearPopupIcon: ActionCreator<AppThunk> = () => (dispatch) =>
	dispatch(setPopupIcon(null));

export const { 
	setIcons, 
	setPopupIcon 
} = icons.actions;

export const { 
	selectIcons, 
	selectPopupIcon 
} = icons.selectors;

export default icons.reducer;
