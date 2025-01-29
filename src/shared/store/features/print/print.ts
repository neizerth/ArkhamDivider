import {
	createSliceSelector,
	createSliceSetter,
} from "@/shared/lib/features/util/slice";
import { ActionCreator, createSlice } from "@reduxjs/toolkit";
import { DEFAULT_LAYOUT, selectLayout, setLayout } from "../layout/layout";
import { PageOrientation, PageSizeType } from "@/shared/types/print";
import { getLayoutGrid } from "@/shared/lib/features/layouts/getLayoutGrid";
import { AppThunk } from "@/shared/store";

export type IPrintState = {
	doubleSided: boolean;
	bleed: boolean;
	cornerRadius: boolean;
	itemsPerPage: number;
	rowsPerPage: number;
	pageSizeType: PageSizeType;
	pageOrientation: PageOrientation;
};

const defaultGrid = getLayoutGrid({
	layout: DEFAULT_LAYOUT,
	bleed: false,
	pageSizeType: PageSizeType.A4,
});

const initialState: IPrintState = {
	doubleSided: false,
	bleed: false,
	pageSizeType: PageSizeType.A4,
	cornerRadius: false,
	...defaultGrid,
};

export const print = createSlice({
	name: "print",
	initialState,
	reducers: {
		setRowsPerPage: createSliceSetter("rowsPerPage"),
		setItemsPerPage: createSliceSetter("itemsPerPage"),
		setDoubleSided: createSliceSetter("doubleSided"),
		setBleed: createSliceSetter("bleed"),
		setPageOrientation: createSliceSetter("pageOrientation"),
		setPageSizeType: createSliceSetter("pageSizeType"),
		setCornerRadius: createSliceSetter("cornerRadius"),
	},
	selectors: {
		selectRowsPerPage: createSliceSelector("rowsPerPage"),
		selectItemsPerPage: createSliceSelector("itemsPerPage"),
		selectDoubleSided: createSliceSelector("doubleSided"),
		selectBleed: createSliceSelector("bleed"),
		selectPageOrientation: createSliceSelector("pageOrientation"),
		selectPageSizeType: createSliceSelector("pageSizeType"),
		selectCornerRadius: createSliceSelector("cornerRadius"),
	},
	extraReducers: (builder) => {
		builder.addCase(setLayout, (state, action) => {
			const layout = action.payload;
			const { bleed, pageSizeType } = state;
			const grid = getLayoutGrid({
				layout,
				bleed,
				pageSizeType,
			});
			return {
				...state,
				...grid,
			};
		});
	},
});

export const setBleed: ActionCreator<AppThunk> =
	(bleed: boolean) => (dispatch, getState) => {
		const state = getState();
		const layout = selectLayout(state);
		const pageSizeType = selectPageSizeType(state);

		const grid = getLayoutGrid({
			layout,
			bleed,
			pageSizeType,
		});

		dispatch(print.actions.setBleed(bleed));
		dispatch(setItemsPerPage(grid.itemsPerPage));
		dispatch(setPageOrientation(grid.pageOrientation));
		dispatch(setRowsPerPage(grid.rowsPerPage));
	};

export const {
	setRowsPerPage,
	setItemsPerPage,
	setDoubleSided,
	setPageOrientation,
	setPageSizeType,
	setCornerRadius,
} = print.actions;

export const {
	selectRowsPerPage,
	selectItemsPerPage,
	selectDoubleSided,
	selectBleed,
	selectPageOrientation,
	selectPageSizeType,
	selectCornerRadius,
} = print.selectors;

export default print.reducer;
