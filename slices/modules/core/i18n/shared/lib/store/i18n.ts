import { createSlice } from "@reduxjs/toolkit";
import { createSliceState } from "redux-toolkit-helpers";
import { DEFAULT_LANGUAGE } from "../../config";

export type I18nState = {
	language: string;
	availableLanguages: string[];
	translatedStories: string[];
};

const initialState: I18nState = {
	language: DEFAULT_LANGUAGE,
	availableLanguages: [DEFAULT_LANGUAGE],
	translatedStories: [],
};

export const i18n = createSlice({
	name: "i18n",
	...createSliceState(initialState),
});

export const { setLanguage, setAvailableLanguages, setTranslatedStories } =
	i18n.actions;

export const {
	selectLanguage,
	selectAvailableLanguages,
	selectTranslatedStories,
} = i18n.selectors;

export default i18n.reducer;
