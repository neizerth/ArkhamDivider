import { createSlice } from '@reduxjs/toolkit';
import { createSliceSetter, createSliceSelector } from '@/util/slice';
import { IDividerList } from '@/types/dividers';

export type IDividersState = {
  list: IDividerList
}

const initialState: IDividersState = {
  list: []
};

export const dividers = createSlice({
  name: 'dividers',
  initialState,
  reducers: {
    setDividerList: createSliceSetter('list')
  },
  selectors: {
    selectDividerList: createSliceSelector('list')
  }
});

export const {
  setDividerList
} = dividers.actions;

export const {
  selectDividerList
} = dividers.selectors;

export default dividers.reducer;