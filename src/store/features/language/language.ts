import { DEFAULT_LANGUAGE } from '@/constants/i18n';
import { AppThunk } from '@/store';
import { createSliceSelector, createSliceSetter } from '@/util/slice';
import { ActionCreator, createSlice } from '@reduxjs/toolkit';
import { loadAppTranslations } from '../app/app';

export type ILanguageState = {
  language: string;
  availableLanguages: string[]
  loadedTranslations: string[]
}

const initialState: ILanguageState = {
  language: DEFAULT_LANGUAGE,
  availableLanguages: []
};

export const language = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLoadedTranslations: createSliceSetter('language'),
    setLanguage: createSliceSetter('language'),
    setAvailableLanguages: createSliceSetter('availableLanguages')
  },
  selectors: {
    selectLanguage: createSliceSelector('language'),
    selectAvailableLanguages: createSliceSelector('availableLanguages')
  }
});

export const changeLanguage: ActionCreator<AppThunk> = (language: string) => async dispatch => {

  dispatch(setLanguage(language));

  if (language === 'en') {
    return;
  }

  dispatch(loadAppTranslations(language));
  
  // dispatch(loadEncounterSetsTranslations(language));
  // dispatch(loadScenarios(language));
  // dispatch(loadCampaigns(language));
  // if (language === 'en') {
  //   return;
  // }
  // dispatch(loadCoreTranslations(language));
}

export type IGithubFilename = {
  name: string;
  path: string;
  size: string;
}

export const {
  setLanguage,
  setAvailableLanguages
} = language.actions;

export const {
  selectLanguage,
  selectAvailableLanguages
} = language.selectors;

export default language.reducer;