import { ArkhamDivider } from 'arkham-divider-data';
import { createSliceSelector, createSliceSetter } from '@/util/slice';
import { createSlice } from '@reduxjs/toolkit';

export type Icons = ArkhamDivider.Core['icons'];

export type IIconsState = {
  icons: Icons
}

const initialState: IIconsState = {
  icons: []
};

export const icons = createSlice({
  name: 'icons',
  initialState,
  reducers: {
    setIcons: createSliceSetter('icons'),
  },
  selectors: {
    selectIcons: createSliceSelector('icons'),
  }
});

export const {
  setIcons,
} = icons.actions;

export const {
  selectIcons,
} = icons.selectors;

export default icons.reducer;