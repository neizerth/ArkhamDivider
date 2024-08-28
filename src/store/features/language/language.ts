import { DEFAULT_LANGUAGE } from '@/constants/i18n';
import { createSliceSelector, createSliceSetter } from '@/util/slice';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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

export const {
  setLanguage
} = language.actions;

export const {
  selectLanguage
} = language.selectors;

export default language.reducer;