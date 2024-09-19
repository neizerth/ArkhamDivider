import { fetchCoreData, fetchLanguageData } from '@/api/arkhamDivider';
import { AppThunk } from '@/store';
import { createSliceSelector, createSliceSetter } from '@/util/slice';
import { ActionCreator, createSlice } from '@reduxjs/toolkit';
import { setStories } from '../stories/stories';
import { setIcons } from '../icons/icons';
import { setAvailableLanguages } from '../language/language';
import { setEncounterSets } from '../encounterSets/encounterSets';

export type IAppState = {
  loading: boolean
}

const initialState: IAppState = {
  loading: true
};

export const app = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLoading: createSliceSetter('loading')
  },
  selectors: {
    selectLoading: createSliceSelector('loading')
  }
});

export const loadAppData: ActionCreator<AppThunk> = () => async dispatch => {
  dispatch(setLoading(true));
  const {
    stories,
    icons,
    encounterSets,
    languages
  } = await fetchCoreData();

  dispatch(setStories(stories));
  dispatch(setEncounterSets(encounterSets));
  dispatch(setAvailableLanguages(languages));
  dispatch(setIcons(icons));
  dispatch(setLoading(false));
}

export const loadAppTranslations: ActionCreator<AppThunk> = (language: string) => async dispatch => {
  dispatch(setLoading(true));
  const {

  } = await fetchLanguageData(language);
  
  dispatch(setLoading(false));
}

export const {
  setLoading
} = app.actions;

export const {
  selectLoading
} = app.selectors;

export default app.reducer;