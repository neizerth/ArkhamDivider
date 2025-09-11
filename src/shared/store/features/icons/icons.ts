import { ActionCreator, createSlice } from '@reduxjs/toolkit';
import { ArkhamDivider } from 'arkham-divider-data';
import { createSliceState } from 'redux-toolkit-helpers';
import { AppThunk } from '@/shared/store';
import { Nullable } from '@/shared/types/util';

export type Icons = ArkhamDivider.Core['icons'];

export type IIconsState = {
  icons: Icons;
  popupIcon: Nullable<{
    default?: string;
    current?: string;
  }>;
};

const initialState: IIconsState = {
  icons: [],
  popupIcon: null,
};

export const icons = createSlice({
  name: 'icons',
  ...createSliceState(initialState),
});

export const clearPopupIcon: ActionCreator<AppThunk> = () => (dispatch) =>
  dispatch(setPopupIcon(null));

export const { setIcons, setPopupIcon } = icons.actions;

export const { selectIcons, selectPopupIcon } = icons.selectors;

export default icons.reducer;
