import { createSlice } from "@reduxjs/toolkit";
import { createSliceState } from "redux-toolkit-helpers";
import { DEFAULT_LANGUAGE } from "../../config";

export type I18nState = {
	language: string | null;
	availableLanguages: string[];
};

const initialState: I18nState = {
	language: null,
	availableLanguages: [DEFAULT_LANGUAGE],
};

export const i18n = createSlice({
	name: "i18n",
	...createSliceState(initialState),
});

export const { setLanguage, setAvailableLanguages } = i18n.actions;

export const { selectLanguage, selectAvailableLanguages } = i18n.selectors;

export default i18n.reducer;
