import { fetchCoreData, fetchLanguageData } from "@/shared/api/arkhamDivider";
import { DEFAULT_LANGUAGE } from "@/shared/config/i18n";
import * as translations from "@/shared/config/translations";
import {
	createSliceSelector,
	createSliceSetter,
} from "@/shared/lib/features/util/slice";
import type { AppThunk } from "@/shared/lib/store";
import type { PopupType } from "@/shared/model/types/ui";
import { type ActionCreator, createSlice } from "@reduxjs/toolkit";
import type { Mapping } from "classnames";
import { setEncounterSets } from "../encounterSets/encounterSets";
import { setCoreTranslations, setCustomTranslations } from "../i18n/i18n";
import { setIcons } from "../icons/icons";
import {
	addTranslatedStories,
	selectLoadedTranslations,
	setAvailableLanguages,
	setLoadedTranslations,
} from "../language/language";
import { setStories } from "../stories/stories";

export type IAppState = {
	export: boolean;
	loading: boolean;
	loadingStatus: {
		text?: string;
		progress: number;
	} | null;
	activePopupId: PopupType | null;
};

const initialState: IAppState = {
	export: false,
	loading: true,
	loadingStatus: null,
	activePopupId: null,
};

export const app = createSlice({
	name: "app",
	initialState,
	reducers: {
		setExport: createSliceSetter("export"),
		setLoadingStatus: createSliceSetter("loadingStatus"),
		setLoading: createSliceSetter("loading"),
		setActivePopupId: createSliceSetter("activePopupId"),
	},
	selectors: {
		selectExport: createSliceSelector("export"),
		selectLoadingStatus: createSliceSelector("loadingStatus"),
		selectLoading: createSliceSelector("loading"),
		selectActivePopupId: createSliceSelector("activePopupId"),
	},
});

export const clearActivePopupId: ActionCreator<AppThunk> = () => (dispatch) =>
	dispatch(setActivePopupId(null));

export const loadAppData: ActionCreator<AppThunk> = () => async (dispatch) => {
	dispatch(setLoading(true));
	const { stories, icons, encounterSets, languages } = await fetchCoreData();

	dispatch(setLoadedTranslations([DEFAULT_LANGUAGE]));
	dispatch(setStories(stories));
	dispatch(setEncounterSets(encounterSets));
	dispatch(setAvailableLanguages(languages));
	dispatch(setIcons(icons));

	dispatch(setLoading(false));
};

export const loadAppTranslations: ActionCreator<AppThunk> =
	(language: string) => async (dispatch, getState) => {
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
			custom,
		} = await fetchLanguageData(language);

		// translations[language as keyof translations];
		// const translationKey = language as keyof typeof translations;

		const translation: Mapping =
			translations[language as keyof typeof translations] || {};

		const mapping = {
			...encounterSets,
			...campaigns,
			...scenarios,
			...stories,
			...common,
			...translation,
			...investigators,
		};

		dispatch(setCoreTranslations(language, mapping));
		dispatch(setCustomTranslations(language, custom));
		dispatch(addTranslatedStories(language, translatedStories));
		dispatch(setLoadedTranslations([...loadedTranslations, language]));
	};

export const { setLoading, setLoadingStatus, setActivePopupId, setExport } =
	app.actions;

export const {
	selectActivePopupId,
	selectLoading,
	selectLoadingStatus,
	selectExport,
} = app.selectors;

export default app.reducer;
