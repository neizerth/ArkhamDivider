import { createSlice } from "@reduxjs/toolkit";
import { omit } from "ramda";
import { createSliceState } from "redux-toolkit-helpers";
import type { Orientation } from "@/shared/model";
import type { DPI, PageFormatType, PageLayoutGrid } from "../../model";

export type PrintState = {
	dpi: DPI;
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
	dpi: 300,
	cropMarksEnabled: true,
	bleedEnabled: true,
	showCornerRadius: false,
	doubleSidePrintEnabled: false,
	pageSize: "A4",
	singleItemPerPage: false,
	orientation: "portrait",
	pageLayoutGrid: null,
};

const state = createSliceState(initialState);

export const print = createSlice({
	name: "print",
	...state,
	reducers: {
		...omit(["setDpi"], state.reducers),
		setDPI: state.reducers.setDpi,
	},
	selectors: {
		...omit(["selectDpi"], state.selectors),
		selectDPI: state.selectors.selectDpi,
	},
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
	setDPI,
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
	selectDPI,
} = print.selectors;

export default print.reducer;
