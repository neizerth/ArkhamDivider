import { IEncounterSet } from "@/shared/types/api";
import { createSlice } from "@reduxjs/toolkit";
import { createSliceState } from "redux-toolkit-helpers";

export type IEncounterSetsState = {
	list: IEncounterSet[];
};

const initialState: IEncounterSetsState = {
	list: [],
};

export const encounterSets = createSlice({
	name: "encounterSets",
	...createSliceState(initialState),
});

export const { 
	setList: setEncounterSets 
} = encounterSets.actions;

export const { 
	selectList: selectEncounterSets 
} = encounterSets.selectors;

export default encounterSets.reducer;
