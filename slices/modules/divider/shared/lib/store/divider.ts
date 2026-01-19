import { createSlice } from "@reduxjs/toolkit";
import { createSliceState } from "redux-toolkit-helpers";
import type { GenerateScenarioDividersParams } from "@/modules/divider/entities/lib/store/features/generateScenarioDividers";
import type { DividerLayoutType } from "../../model";

export type DividerState = {
	layoutId: string | null;
	categoryId: string | null;
	dividerType: DividerLayoutType | null;
	scenarioParams: GenerateScenarioDividersParams | null;
};

const initialState: DividerState = {
	layoutId: null,
	categoryId: null,
	dividerType: null,
	scenarioParams: null,
};

export const divider = createSlice({
	name: "divider",
	...createSliceState(initialState),
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
