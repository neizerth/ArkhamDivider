import { createSlice } from "@reduxjs/toolkit";
import { createSliceState } from "redux-toolkit-helpers";
import type { GenerateScenarioDividersParams } from "@/modules/divider/entities/lib/store/features/generateScenarioDividers";
import type { DividerLayoutType } from "../../model";
import { getDividerType } from "../logic";

export type DividerState = {
	layoutId: string | null;
	categoryId: string | null;
	dividerType: DividerLayoutType | null;
	scenarioParams: Partial<GenerateScenarioDividersParams>;
};

const initialState: DividerState = {
	layoutId: null,
	categoryId: null,
	dividerType: null,
	scenarioParams: {
		encounterDividers: true,
		scenarioDividers: true,
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

export const { setLayoutId, setCategoryId, setDividerType, setScenarioParams } =
	divider.actions;

export const {
	selectLayoutId,
	selectCategoryId,
	selectDividerType,
	selectScenarioParams,
} = divider.selectors;

export default divider.reducer;
