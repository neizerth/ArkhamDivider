import { createSlice } from "@reduxjs/toolkit";
import { createSliceState } from "redux-toolkit-helpers";
import { factions } from "@/modules/faction/shared/config";
import { cardTypes } from "../../config";

import type {
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
		xpCosts: [],
	},
	investigatorParams: {
		storyCodes: [],
	},
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
} = divider.actions;

export const {
	selectLayoutId,
	selectCategoryId,
	selectDividerType,
	selectScenarioParams,
	selectPlayerParams,
} = divider.selectors;

export default divider.reducer;
