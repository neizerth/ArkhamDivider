import { createSliceSelector, createSliceSetter } from '@/util/slice';
import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_LAYOUT, setLayout } from '../layout/layout';

export type IPrintState = {
  doubleSided: boolean
  bleed: boolean
  itemsPerPage: number
  rowsPerPage: number
}

const initialState: IPrintState = {
  doubleSided: false,
  bleed: false,
  itemsPerPage: DEFAULT_LAYOUT.groupSize,
  rowsPerPage: DEFAULT_LAYOUT.rowSize
};

export const print = createSlice({
  name: 'print',
  initialState,
  reducers: {
    setRowsPerPage: createSliceSetter('rowsPerPage'),
    setItemsPerPage: createSliceSetter('itemsPerPage'),
    setDoubleSided: createSliceSetter('doubleSided'),
    setBleed: createSliceSetter('bleed')
  },
  selectors: {
    selectRowsPerPage: createSliceSelector('rowsPerPage'),
    selectItemsPerPage: createSliceSelector('itemsPerPage'),
    selectDoubleSided: createSliceSelector('doubleSided'),
    selectBleed: createSliceSelector('bleed')
  },
  extraReducers: builder => {
    builder.addCase(setLayout, (state, action) => {
      const { groupSize, rowSize } = action.payload;
      state.itemsPerPage = groupSize;
      state.rowsPerPage = rowSize;
    });
      // Add extra reducers here
  }
});

export const {
  setRowsPerPage,
  setItemsPerPage,
  setDoubleSided,
  setBleed
} = print.actions;

export const {
  selectRowsPerPage,
  selectItemsPerPage,
  selectDoubleSided,
  selectBleed
} = print.selectors;

export default print.reducer;