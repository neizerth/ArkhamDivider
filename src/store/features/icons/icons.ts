import { fetchIcomoonProject } from '@/api/arkhamCards';
import { transformProjectToIconSet } from './transform/icomoon';
import { AppThunk } from '@/store';
import { IIcoMoonProject, IReactIcoMoonExtendedIconSet } from '@/types/icomoon';
import { createSliceSelector, createSliceSetter } from '@/util/slice';
import { createSlice, ActionCreator } from '@reduxjs/toolkit';

export type IIconsState = {
  loading: boolean;
  iconSet?: IReactIcoMoonExtendedIconSet
}

const initialState: IIconsState = {
  loading: true
};

export const icons = createSlice({
  name: 'icons',
  initialState,
  reducers: {
    setIconSet: createSliceSetter('iconSet'),
  },
  selectors: {
    selectIconSet: createSliceSelector('iconSet')
  }
});

export const {
  setIconSet
} = icons.actions;

export const {
  selectIconSet
} = icons.selectors;

export const loadIcons: ActionCreator<AppThunk> = () => async dispatch => {
  const response = await fetchIcomoonProject();
  const json: IIcoMoonProject = await response.json();
  const iconSet = transformProjectToIconSet(json);
  
  dispatch(setIconSet(iconSet));
}

export default icons.reducer;