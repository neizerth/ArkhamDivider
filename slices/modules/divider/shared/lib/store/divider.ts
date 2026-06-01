import { createSlice } from "@reduxjs/toolkit";
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
