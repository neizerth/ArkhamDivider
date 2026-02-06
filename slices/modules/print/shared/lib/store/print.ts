import { createSlice } from "@reduxjs/toolkit";
import { omit } from "ramda";
import { createSliceState } from "redux-toolkit-helpers";
import type { Orientation } from "@/shared/model";
import type { DPI, PageFormatType, PageLayoutGrid } from "../../model";

export type PrintState = {
	dpi: DPI;
	previewZoom: number | null;
	cropMarksEnabled: boolean;
	bleedEnabled: boolean;
	showCornerRadius: boolean;
	doubleSidePrintEnabled: boolean;
	lasercutEnabled: boolean;
	pageSize: PageFormatType;
	singleItemPerPage: boolean;
	orientation: Orientation;
	pageLayoutGrid: PageLayoutGrid | null;
};

const initialState: PrintState = {
	dpi: 300,
	previewZoom: null,
	cropMarksEnabled: true,
	bleedEnabled: true,
	showCornerRadius: false,
	doubleSidePrintEnabled: false,
	lasercutEnabled: false,
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
	setLasercutEnabled,
	setPageSize,
	setSingleItemPerPage,
	setPageLayoutGrid,
	setOrientation,
	setPreviewZoom,
	setDPI,
} = print.actions;

export const {
	selectCropMarksEnabled,
	selectBleedEnabled,
	selectShowCornerRadius,
	selectDoubleSidePrintEnabled,
	selectLasercutEnabled,
	selectPageSize,
	selectSingleItemPerPage,
	selectPageLayoutGrid,
	selectOrientation,
	selectPreviewZoom,
	selectDPI,
} = print.selectors;

export default print.reducer;
