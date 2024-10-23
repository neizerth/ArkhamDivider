import { createSliceSelector, createSliceSetter } from '@/util/slice';
import { createSlice } from '@reduxjs/toolkit';

export type IPrintState = {
  doubleSided: boolean;
  bleeds: boolean;
  itemPerPage: boolean;
}

const initialState: IPrintState = {
  doubleSided: false,
  bleeds: false,
  itemPerPage: false
};

export const print = createSlice({
  name: 'print',
  initialState,
  reducers: {
    setItemPerPage: createSliceSetter('itemPerPage'),
    setDoubleSided: createSliceSetter('doubleSided'),
    setBleeds: createSliceSetter('bleeds')
  },
  selectors: {
    selectItemPerPage: createSliceSelector('itemPerPage'),
    selectDoubleSided: createSliceSelector('doubleSided'),
    selectBleeds: createSliceSelector('bleeds')
  }
});

export const {
  setItemPerPage,
  setDoubleSided,
  setBleeds
} = print.actions;

export const {
  selectItemPerPage,
  selectDoubleSided,
  selectBleeds
} = print.selectors;

export default print.reducer;