import { createSlice } from "@reduxjs/toolkit";
import { createSliceState } from "redux-toolkit-helpers";
import type { Orientation } from "@/shared/model";
import type { PageFormatType, PageLayoutGrid } from "../../model";

export type PrintState = {
	cropMarksEnabled: boolean;
	bleedEnabled: boolean;
	showCornerRadius: boolean;
	doubleSidePrintEnabled: boolean;
	pageSize: PageFormatType;
	singleItemPerPage: boolean;
	orientation: Orientation;
	pageLayoutGrid: PageLayoutGrid | null;
};

const initialState: PrintState = {
	cropMarksEnabled: true,
	bleedEnabled: true,
	showCornerRadius: false,
	doubleSidePrintEnabled: false,
	pageSize: "A4",
	singleItemPerPage: false,
	orientation: "portrait",
	pageLayoutGrid: null,
};

export const print = createSlice({
	name: "print",
	...createSliceState(initialState),
});

export const {
	setCropMarksEnabled,
	setBleedEnabled,
	setShowCornerRadius,
	setDoubleSidePrintEnabled,
	setPageSize,
	setSingleItemPerPage,
	setPageLayoutGrid,
	setOrientation,
} = print.actions;

export const {
	selectCropMarksEnabled,
	selectBleedEnabled,
	selectShowCornerRadius,
	selectDoubleSidePrintEnabled,
	selectPageSize,
	selectSingleItemPerPage,
	selectPageLayoutGrid,
	selectOrientation,
} = print.selectors;

export default print.reducer;
