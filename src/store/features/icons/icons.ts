import { ArkhamDivider } from 'arkham-divider-data';
import { createSliceSelector, createSliceSetter } from '@/util/slice';
import { ActionCreator, createSlice } from '@reduxjs/toolkit';
import { AppThunk } from '@/store';
import { setActivePopupId } from '../app/app';
import { PopupType } from '@/types/ui';

export type Icons = ArkhamDivider.Core['icons'];

export type IIconsState = {
  icons: Icons,
  popupIcon: string | null
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
  },
  extraReducers(builder) {
    builder.addCase(setActivePopupId, (state, action) => {
      const id = action.payload
      if (id === PopupType.ICON_SELECT) {
        return;
      }
      state.popupIcon = null;
    })
  },
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