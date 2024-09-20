import { fetchCoreData, fetchLanguageData } from '@/api/arkhamDivider';
import { AppThunk } from '@/store';
import { createSliceSelector, createSliceSetter } from '@/util/slice';
import { ActionCreator, createSlice } from '@reduxjs/toolkit';
import { setStories } from '../stories/stories';
import { setIcons } from '../icons/icons';
import { addTranslatedStories, setAvailableLanguages, setLoadedTranslations } from '../language/language';
import { setEncounterSets } from '../encounterSets/encounterSets';
import { DEFAULT_LANGUAGE } from '@/constants/i18n';
import { setCoreTranslations } from '../i18n/i18n';
import * as translations from '@/translations';
import { Mapping } from 'classnames';

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

  dispatch(setLoadedTranslations([DEFAULT_LANGUAGE]));
  dispatch(setStories(stories));
  dispatch(setEncounterSets(encounterSets));
  dispatch(setAvailableLanguages(languages));
  dispatch(setIcons(icons));
  dispatch(setLoading(false));
}

export const loadAppTranslations: ActionCreator<AppThunk> = (language: string) => async dispatch => {
  const {
    translatedStories,
    campaigns,
    scenarios,
    encounterSets,
    stories,
    common,
  } = await fetchLanguageData(language);

  // translations[language as keyof translations];
  // const translationKey = language as keyof typeof translations;

  const translation: Mapping = translations[language as keyof typeof translations] || {};

  console.log(translation)

  const mapping = {
    ...encounterSets,
    ...campaigns,
    ...scenarios,
    ...stories,
    ...common,
    ...translation
  };
  
  dispatch(setCoreTranslations(language, mapping));
  dispatch(addTranslatedStories(language, translatedStories));
}

export const {
  setLoading
} = app.actions;

export const {
  selectLoading
} = app.selectors;

export default app.reducer;