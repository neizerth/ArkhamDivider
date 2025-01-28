import { DEFAULT_LANGUAGE } from "@/shared/config/i18n";
import { AppThunk } from "@/shared/store";
import { ActionCreator, createSlice } from "@reduxjs/toolkit";
import { loadAppTranslations } from "../app/app";
import { Mapping } from "@/shared/types/util";
import { createSliceState } from "redux-toolkit-helpers";

export type ILanguageState = {
	language: string;
	availableLanguages: string[];
	loadedTranslations: string[];
	translatedStories: Mapping<string[]>;
};

const initialState: ILanguageState = {
	language: DEFAULT_LANGUAGE,
	availableLanguages: [],
	loadedTranslations: [],
	translatedStories: {},
};

export const language = createSlice({
	name: "language",
	...createSliceState(initialState)
});

export const changeLanguage: ActionCreator<AppThunk> =
	(language: string) => async (dispatch, getState) => {
		dispatch(setLanguage(language));

		if (language === "en") {
			return;
		}

		const state = getState();
		const loadedTranslations = selectLoadedTranslations(state);

		if (loadedTranslations.includes(language)) {
			return;
		}

		dispatch(loadAppTranslations(language));
	};

export const addTranslatedStories: ActionCreator<AppThunk> =
	(language: string, translated: string[]) => async (dispatch, getState) => {
		const data = selectTranslatedStories(getState());

		dispatch(
			setTranslatedStories({
				...data,
				[language]: translated,
			}),
		);
	};

export const {
	setLanguage,
	setAvailableLanguages,
	setLoadedTranslations,
	setTranslatedStories,
} = language.actions;

export const {
	selectLanguage,
	selectAvailableLanguages,
	selectLoadedTranslations,
	selectTranslatedStories,
} = language.selectors;

export default language.reducer;
