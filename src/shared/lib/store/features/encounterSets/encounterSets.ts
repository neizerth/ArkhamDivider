import {
	createSliceSelector,
	createSliceSetter,
} from "@/shared/lib/features/util/slice";
import type { IEncounterSet } from "@/shared/model/types/api";
import { createSlice } from "@reduxjs/toolkit";

export type IEncounterSetsState = {
	list: IEncounterSet[];
};

const initialState: IEncounterSetsState = {
	list: [],
};

export const encounterSets = createSlice({
	name: "encounterSets",
	initialState,
	reducers: {
		setEncounterSets: createSliceSetter("list"),
	},
	selectors: {
		selectEncounterSets: createSliceSelector("list"),
	},
});

export const { setEncounterSets } = encounterSets.actions;

export const { selectEncounterSets } = encounterSets.selectors;

export default encounterSets.reducer;
