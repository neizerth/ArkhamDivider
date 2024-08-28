import { DEFAULT_LANGUAGE } from '@/constants/i18n';
import { AppThunk } from '@/store';
import { createSliceSelector, createSliceSetter } from '@/util/slice';
import { ActionCreator, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loadScenarios } from '../scenarios/scenarios';
import { loadCampaigns } from '../campaigns/campaigns';
import { loadCoreTranslations, loadEncounterSetsTranslations } from '../i18n/i18n';
import { setI18NLanguage } from '@/util/i18n';

export type ILanguageState = {
  language?: string;
}

const initialState: ILanguageState = {
  language: DEFAULT_LANGUAGE
};

export const language = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: createSliceSetter('language')
  },
  selectors: {
    selectLanguage: createSliceSelector('language')
  }
});

export const changeLanguage: ActionCreator<AppThunk> = (language: string) => async dispatch => {
  setI18NLanguage(language);

  dispatch(setLanguage(language));
  
  dispatch(loadEncounterSetsTranslations(language));
  dispatch(loadScenarios(language));
  dispatch(loadCampaigns(language));
  dispatch(loadCoreTranslations(language));
}


export const {
  setLanguage
} = language.actions;

export const {
  selectLanguage
} = language.selectors;

export default language.reducer;