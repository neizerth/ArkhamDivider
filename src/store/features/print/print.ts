import { createSliceSelector, createSliceSetter } from '@/util/slice';
import { createSlice } from '@reduxjs/toolkit';

export type IPrintState = {
  doubleSided: boolean
}

const initialState: IPrintState = {
  doubleSided: false
};

export const print = createSlice({
  name: 'print',
  initialState,
  reducers: {
    setDoubleSided: createSliceSetter('doubleSided')
  },
  selectors: {
    selectDoubleSided: createSliceSelector('doubleSided')
  }
});

export const {
  setDoubleSided
} = print.actions;

export const {
  selectDoubleSided
} = print.selectors;

export default print.reducer;