import { transformProjectToIconSet } from './transformResponse/icomoon';
import { AppThunk } from '@/store';
import { IIcoMoonProject, IReactIcoMoonExtendedIconSet } from '@/types/icomoon';
import { createSliceSelector, createSliceSetter } from '@/util/slice';
import { createSlice, ActionCreator } from '@reduxjs/toolkit';

export const ARKHAM_CARDS_ICOMOON_PROJECT_URL = process.env.NEXT_PUBLIC_ARKHAM_CARDS_URL + '/assets/icomoon/project.json'; 

export type IIconsState = {
  iconSet?: IReactIcoMoonExtendedIconSet
}

const initialState: IIconsState = {

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
  setIconSet
} = icons.actions;

export const {
  selectIconSet
} = icons.selectors;

export const loadIcons: ActionCreator<AppThunk> = () => async dispatch => {
  const response = await fetch(ARKHAM_CARDS_ICOMOON_PROJECT_URL);
  const json: IIcoMoonProject = await response.json();
  const iconSet = transformProjectToIconSet(json);
  
  dispatch(setIconSet(iconSet));
}

export default icons.reducer;