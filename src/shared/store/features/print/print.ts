import { ActionCreator, createSlice } from '@reduxjs/toolkit';
import { createSliceState } from 'redux-toolkit-helpers';
import { getLayoutGrid } from '@/shared/lib/features/layouts/getLayoutGrid';
import { AppThunk } from '@/shared/store';
import { PageOrientation, PageSizeType } from '@/shared/types/print';
import { DEFAULT_LAYOUT, selectLayout, setLayout } from '../layout/layout';

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
  name: 'print',
  ...createSliceState(initialState),
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

export const setBleed: ActionCreator<AppThunk> = (bleed: boolean) => (dispatch, getState) => {
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
