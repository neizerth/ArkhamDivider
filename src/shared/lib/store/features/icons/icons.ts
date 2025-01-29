import {
	createSliceSelector,
	createSliceSetter,
} from "@/shared/lib/features/util/slice";
import type { AppThunk } from "@/shared/lib/store";
import { type ActionCreator, createSlice } from "@reduxjs/toolkit";
import type { ArkhamDivider } from "arkham-divider-data";

export type Icons = ArkhamDivider.Core["icons"];

export type IIconsState = {
	icons: Icons;
	popupIcon: {
		default?: string;
		current?: string;
	} | null;
};

const initialState: IIconsState = {
	icons: [],
	popupIcon: null,
};

export const icons = createSlice({
	name: "icons",
	initialState,
	reducers: {
		setIcons: createSliceSetter("icons"),
		setPopupIcon: createSliceSetter("popupIcon"),
	},
	selectors: {
		selectIcons: createSliceSelector("icons"),
		selectPopupIcon: createSliceSelector("popupIcon"),
	},
});

export const clearPopupIcon: ActionCreator<AppThunk> = () => (dispatch) =>
	dispatch(setPopupIcon(null));

export const { setIcons, setPopupIcon } = icons.actions;

export const { selectIcons, selectPopupIcon } = icons.selectors;

export default icons.reducer;
