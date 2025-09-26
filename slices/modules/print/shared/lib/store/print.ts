import { createSlice } from "@reduxjs/toolkit";
import { createSliceState } from "redux-toolkit-helpers";
import type { PageFormatType } from "../../model";

export type PrintState = {
	cropMarksEnabled: boolean;
	bleedEnabled: boolean;
	showCornerRadius: boolean;
	doubleSidePrintEnabled: boolean;
	pageSize: PageFormatType;
};

const initialState: PrintState = {
	cropMarksEnabled: true,
	bleedEnabled: true,
	showCornerRadius: false,
	doubleSidePrintEnabled: false,
	pageSize: "A4",
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
} = print.actions;

export const {
	selectCropMarksEnabled,
	selectBleedEnabled,
	selectShowCornerRadius,
	selectDoubleSidePrintEnabled,
	selectPageSize,
} = print.selectors;

export default print.reducer;
