import { fetchIcomoonProject, fetchIconPatch } from '@/api/arkhamCards';
import { transformProjectToIconSet } from './transform/icomoon';
import { AppSelector, AppThunk } from '@/store';
import { IIcoMoonProject, IReactIcoMoonExtendedIconSet } from '@/types/icomoon';
import { createSliceSelector, createSliceSetter } from '@/util/slice';
import { createSlice, ActionCreator } from '@reduxjs/toolkit';
import { transformComponentToPatch } from './transform/iconPatch';

export type IIconMapping = {
  [index: string]: string;
}

export type IIconsState = {
  loading: boolean;
  iconMapping: IIconMapping;
  iconSet?: IReactIcoMoonExtendedIconSet
}

const initialState: IIconsState = {
  iconMapping: {},
  loading: true
};

export const icons = createSlice({
  name: 'icons',
  initialState,
  reducers: {
    setIconSet: createSliceSetter('iconSet'),
    setIconMapping: createSliceSetter('iconMapping'),
  },
  selectors: {
    selectIconSet: createSliceSelector('iconSet'),
    selectIconMapping: createSliceSelector('iconMapping'),
  }
});

export const {
  setIconSet,
  setIconMapping
} = icons.actions;

export const {
  selectIconSet,
  selectIconMapping
} = icons.selectors;

export const loadIcons: ActionCreator<AppThunk> = () => async dispatch => {
  const response = await fetchIcomoonProject();
  const json: IIcoMoonProject = await response.json();
  const iconSet = transformProjectToIconSet(json);

  
  dispatch(setIconSet(iconSet));
  dispatch(loadIconPatch());
}

export const patchIconMapping = (baseMapping: IIconMapping, patch: IIconMapping) => {
  return {
    ...baseMapping,
    ...patch
  };

}

export const loadIconPatch: ActionCreator<AppThunk> = () => async(dispatch) => {
  const response = await fetchIconPatch();
  const contents = await response.text();

  const patch = transformComponentToPatch(contents);
  // const iconMapping = selectIconMapping(getStore());
  // const mapping = patchIconMapping(iconMapping, patch);
  // console.log({ mapping });
 
  dispatch(setIconMapping(patch));
}

export const selectEncounterSetIconName = (id: string): AppSelector<string> => (state): string => {
  const mapping = selectIconMapping(state);
  return mapping[id] || id;
}

export default icons.reducer;