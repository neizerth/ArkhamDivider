import { IIconSet } from '@/types/icomoon';
import { createSliceSelector, createSliceSetter } from '@/util/slice';
import { createSlice } from '@reduxjs/toolkit';
import { Mapping } from 'classnames';

export type IIconsState = {
  iconMapping: Mapping;
  iconSet?: IIconSet
}

const initialState: IIconsState = {
  iconMapping: {}
};

export const icons = createSlice({
  name: 'icons',
  initialState,
  reducers: {
    setIconSet: createSliceSetter('iconSet'),
  },
  selectors: {
    selectIconSet: createSliceSelector('iconSet'),
  }
});

export const {
  setIconSet,
} = icons.actions;

export const {
  selectIconSet,
} = icons.selectors;

export default icons.reducer;