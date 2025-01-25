import { DEFAULT_LANGUAGE } from "@/shared/config/i18n";
import { AppThunk } from "@/app/store";
import {
	createSliceSelector,
	createSliceSetter,
} from "@/shared/lib/features/util/slice";
import { ActionCreator, createSlice } from "@reduxjs/toolkit";
import { loadAppTranslations } from "../app/app";
import { Mapping } from "@/shared/types/util";

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
	initialState,
	reducers: {
		setTranslatedStories: createSliceSetter("translatedStories"),
		setLoadedTranslations: createSliceSetter("loadedTranslations"),
		setLanguage: createSliceSetter("language"),
		setAvailableLanguages: createSliceSetter("availableLanguages"),
	},
	selectors: {
		selectTranslatedStories: createSliceSelector("translatedStories"),
		selectLoadedTranslations: createSliceSelector("loadedTranslations"),
		selectLanguage: createSliceSelector("language"),
		selectAvailableLanguages: createSliceSelector("availableLanguages"),
	},
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
