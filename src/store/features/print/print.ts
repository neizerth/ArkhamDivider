import { createSliceSelector, createSliceSetter } from '@/util/slice';
import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_LAYOUT, setLayout } from '../layout/layout';

export type IPrintState = {
  doubleSided: boolean
  bleeds: boolean
  itemsPerPage: number
}

const initialState: IPrintState = {
  doubleSided: false,
  bleeds: false,
  itemsPerPage: DEFAULT_LAYOUT.groupSize
};

export const print = createSlice({
  name: 'print',
  initialState,
  reducers: {
    setItemsPerPage: createSliceSetter('itemsPerPage'),
    setDoubleSided: createSliceSetter('doubleSided'),
    setBleeds: createSliceSetter('bleeds')
  },
  selectors: {
    selectItemsPerPage: createSliceSelector('itemsPerPage'),
    selectDoubleSided: createSliceSelector('doubleSided'),
    selectBleeds: createSliceSelector('bleeds')
  },
  extraReducers: builder => {
    builder.addCase(setLayout, (state, action) => {
      const { groupSize } = action.payload;
      state.itemsPerPage = groupSize;
    });
      // Add extra reducers here
  }
});

export const {
  setItemsPerPage,
  setDoubleSided,
  setBleeds
} = print.actions;

export const {
  selectItemsPerPage,
  selectDoubleSided,
  selectBleeds
} = print.selectors;

export default print.reducer;