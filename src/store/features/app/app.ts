import { fetchCoreData, fetchLanguageData } from '@/api/arkhamDivider';
import { AppThunk } from '@/store';
import { createSliceSelector, createSliceSetter } from '@/util/slice';
import { ActionCreator, createSlice } from '@reduxjs/toolkit';
import { setStories } from '../stories/stories';
import { setIcons } from '../icons/icons';
import { addTranslatedStories, selectLoadedTranslations, setAvailableLanguages, setLoadedTranslations } from '../language/language';
import { setEncounterSets } from '../encounterSets/encounterSets';
import { DEFAULT_LANGUAGE } from '@/constants/i18n';
import { setCoreTranslations } from '../i18n/i18n';
import * as translations from '@/translations';
import { Mapping } from 'classnames';
import { PopupType } from '@/types/ui';

export type IAppState = {
  loading: boolean,
  activePopupId: PopupType | null
}

const initialState: IAppState = {
  loading: true,
  activePopupId: null
};

export const app = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLoading: createSliceSetter('loading'),
    setActivePopupId: createSliceSetter('activePopupId')
  },
  selectors: {
    selectLoading: createSliceSelector('loading'),
    selectActivePopupId: createSliceSelector('activePopupId')
  }
});

export const clearActivePopupId: ActionCreator<AppThunk> = () => dispatch => dispatch(setActivePopupId(null));

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

export const loadAppTranslations: ActionCreator<AppThunk> = (language: string) => async (dispatch, getState) => {
  const state = getState();
  
  const loadedTranslations = selectLoadedTranslations(state);

  if (loadedTranslations.includes(language)) {
    return;
  }
  
  const {
    translatedStories,
    campaigns,
    scenarios,
    encounterSets,
    stories,
    investigators,
    common,
  } = await fetchLanguageData(language);

  // translations[language as keyof translations];
  // const translationKey = language as keyof typeof translations;

  const translation: Mapping = translations[language as keyof typeof translations] || {};

  const mapping = {
    ...encounterSets,
    ...campaigns,
    ...scenarios,
    ...stories,
    ...common,
    ...translation,
    ...investigators
  };
  
  dispatch(setCoreTranslations(language, mapping));
  dispatch(addTranslatedStories(language, translatedStories));
  dispatch(setLoadedTranslations([
    ...loadedTranslations,
    language
  ]))
}

export const {
  setLoading,
  setActivePopupId
} = app.actions;

export const {
  selectLoading,
  selectActivePopupId
} = app.selectors;

export default app.reducer;