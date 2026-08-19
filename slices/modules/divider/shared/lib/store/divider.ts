import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { createSliceState } from "redux-toolkit-helpers";
import { factions } from "@/modules/faction/shared/config";
import { cardTypes } from "../../config";

import type {
	DividerLayoutParams,
	DividerLayoutType,
	InvestigatorDividerParams,
	PlayerDividerParams,
	ScenarioDividerParams,
} from "../../model";
import { getDividerType } from "../logic";

export type DividerState = {
	layoutId: string | null;
	categoryId: string | null;
	dividerType: DividerLayoutType | null;
	scenarioParams: Partial<ScenarioDividerParams>;
	playerParams: Partial<PlayerDividerParams>;
	investigatorParams: Partial<InvestigatorDividerParams>;
	layoutParams: DividerLayoutParams | null;
};

const initialState: DividerState = {
	layoutId: null,
	categoryId: null,
	dividerType: null,
	scenarioParams: {
		encounterDividers: true,
		scenarioDividers: true,
	},
	playerParams: {
		factions,
		cardTypes,
		subtypes: [],
		numericXP: false,
		xpCosts: [
			{
				type: "fixed",
				name: "0",
				value: 0,
			},
			{
				type: "range",
				name: "1+",
				min: 1,
				max: 2,
			},
			{
				type: "range",
				name: "3+",
				min: 3,
				max: 5,
			},
		],
	},
	investigatorParams: {
		storyCodes: [],
	},
	layoutParams: null,
};
const state = createSliceState(initialState);

export const divider = createSlice({
	name: "divider",
	...state,
	reducers: {
		...state.reducers,
		setLayoutParams: (
			state,
			{
				payload,
			}: PayloadAction<{
				layoutId?: string;
				layoutParams: DividerLayoutParams;
			}>,
		) => {
			const { layoutId = state.layoutId, layoutParams } = payload;
			if (!layoutId) {
				return;
			}
			state.layoutParams ??= {};
			state.layoutParams[layoutId] = layoutParams;
		},
		setLayoutParam: (
			state,
			action: PayloadAction<{
				key: string;
				value: unknown;
				locale: string;
				layoutId?: string;
			}>,
		) => {
			const { key, value, locale, layoutId = state.layoutId } = action.payload;
			if (!layoutId) {
				return;
			}
			state.layoutParams ??= {};
			state.layoutParams[layoutId] ??= {};
			state.layoutParams[layoutId][locale] ??= {};
			state.layoutParams[layoutId][locale][key] = value;
		},
	},
	selectors: {
		...state.selectors,
		selectDividerType: (state) => getDividerType(state.dividerType),
	},
});

export const {
	setLayoutId,
	setCategoryId,
	setDividerType,
	setScenarioParams,
	setPlayerParams,
	setInvestigatorParams,
	setLayoutParams,
	setLayoutParam,
} = divider.actions;

export const {
	selectLayoutId,
	selectCategoryId,
	selectDividerType,
	selectScenarioParams,
	selectPlayerParams,
	selectInvestigatorParams,
	selectLayoutParams,
} = divider.selectors;

export default divider.reducer;
