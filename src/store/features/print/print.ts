import { createSliceSelector, createSliceSetter } from '@/util/slice';
import { createSlice } from '@reduxjs/toolkit';

export type IPrintState = {
  doubleSided: boolean
  bleeds: boolean
}

const initialState: IPrintState = {
  doubleSided: false,
  bleeds: false,
};

export const print = createSlice({
  name: 'print',
  initialState,
  reducers: {
    setDoubleSided: createSliceSetter('doubleSided'),
    setBleeds: createSliceSetter('bleeds')
  },
  selectors: {
    selectDoubleSided: createSliceSelector('doubleSided'),
    selectBleeds: createSliceSelector('bleeds')
  }
});

export const {
  setDoubleSided,
  setBleeds
} = print.actions;

export const {
  selectDoubleSided,
  selectBleeds
} = print.selectors;

export default print.reducer;