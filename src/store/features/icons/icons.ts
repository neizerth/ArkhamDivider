import { createSliceSelector, createSliceSetter } from '@/util/slice';
import { ActionCreator, createSlice } from '@reduxjs/toolkit';
import { AppThunk } from '@/store';
import { IIcon } from '@/types/api';

export type IIconsState = {
  icons: IIcon[],
  popupIcon: {
    default?: string,
    current?: string
  } | null
}

const initialState: IIconsState = {
  icons: [],
  popupIcon: null
};

export const icons = createSlice({
  name: 'icons',
  initialState,
  reducers: {
    setIcons: createSliceSetter('icons'),
    setPopupIcon: createSliceSetter('popupIcon'),
  },
  selectors: {
    selectIcons: createSliceSelector('icons'),
    selectPopupIcon: createSliceSelector('popupIcon'),
  }
});

export const clearPopupIcon: ActionCreator<AppThunk> = () => dispatch => dispatch(setPopupIcon(null));

export const {
  setIcons,
  setPopupIcon
} = icons.actions;

export const {
  selectIcons,
  selectPopupIcon
} = icons.selectors;

export default icons.reducer;