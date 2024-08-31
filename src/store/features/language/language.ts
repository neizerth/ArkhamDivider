import { DEFAULT_LANGUAGE } from '@/constants/i18n';
import { AppThunk } from '@/store';
import { createSliceSelector, createSliceSetter } from '@/util/slice';
import { ActionCreator, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loadScenarios } from '../scenarios/scenarios';
import { loadCampaigns } from '../campaigns/campaigns';
import { loadCoreTranslations, loadEncounterSetsTranslations } from '../i18n/i18n';
import { setI18NLanguage } from '@/util/i18n';
import { fetchGenerated, fetchI18NSource } from '@/api/arkhamCards';
import { unique } from '@/util/common';

export type ILanguageState = {
  language: string;
  availableLanguages: string[]
}

const initialState: ILanguageState = {
  language: DEFAULT_LANGUAGE,
  availableLanguages: [DEFAULT_LANGUAGE]
};

export const language = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: createSliceSetter('language'),
    setAvailableLanguages: createSliceSetter('availableLanguages')
  },
  selectors: {
    selectLanguage: createSliceSelector('language'),
    selectAvailableLanguages: createSliceSelector('availableLanguages')
  }
});

export const changeLanguage: ActionCreator<AppThunk> = (language: string) => async dispatch => {
  setI18NLanguage(language);

  dispatch(setLanguage(language));
  
  dispatch(loadEncounterSetsTranslations(language));
  dispatch(loadScenarios(language));
  dispatch(loadCampaigns(language));
  if (language === 'en') {
    return;
  }
  dispatch(loadCoreTranslations(language));
}

export type IGithubFilename = {
  name: string;
  path: string;
  size: string;
}

export const loadAvailableLanguages: ActionCreator<AppThunk> = () => async dispatch => {

  const response = await fetchGenerated();
  const list: IGithubFilename[] = await response.json();

  const campaignsPrefix = 'allCampaigns_';
  const languages = list
    .filter(({ name }) => name.startsWith(campaignsPrefix))
    .map(({ name }) => name
      .replace(campaignsPrefix, '')
      .replace('.json', '')
    )

  const availableLanguages = ['en', ...languages];

  dispatch(setAvailableLanguages(availableLanguages));
  // const response = await fetchI18NSource();
  // const source = await response.text();
  // const re = /const ALL_LANGUAGES = \[([^\[]+)\]/mg;
  // const [constDeclaration = '']  = source.match(re) || [];

  // const languageRe = /'(.*)'/gm;
  // const languageMatches = constDeclaration.matchAll(languageRe)
  // const languages = Array.from(languageMatches).map(matches => matches[1]);
  // const uniqueLanguages = unique(languages);

  // dispatch(setAvailableLanguages(uniqueLanguages));
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