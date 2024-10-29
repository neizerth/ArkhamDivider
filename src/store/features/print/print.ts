import { createSliceSelector, createSliceSetter } from '@/util/slice';
import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_LAYOUT, setLayout } from '../layout/layout';

export type IPrintState = {
  doubleSided: boolean
  bleeds: boolean
  itemsPerPage: number
  rowsPerPage: number
}

const initialState: IPrintState = {
  doubleSided: false,
  bleeds: false,
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
    setBleeds: createSliceSetter('bleeds')
  },
  selectors: {
    selectRowsPerPage: createSliceSelector('rowsPerPage'),
    selectItemsPerPage: createSliceSelector('itemsPerPage'),
    selectDoubleSided: createSliceSelector('doubleSided'),
    selectBleeds: createSliceSelector('bleeds')
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
  setBleeds
} = print.actions;

export const {
  selectRowsPerPage,
  selectItemsPerPage,
  selectDoubleSided,
  selectBleeds
} = print.selectors;

export default print.reducer;