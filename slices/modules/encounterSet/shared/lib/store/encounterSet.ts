import { createSlice } from "@reduxjs/toolkit";
import { createSliceState } from "redux-toolkit-helpers";
import type { EncounterSet } from "../../model";

export type EncounterSetState = {
	encounterSets: EncounterSet[];
};

const initialState: EncounterSetState = {
	encounterSets: [],
};

export const encounterSet = createSlice({
	name: "encounterSet",
	...createSliceState(initialState),
});

export const { setEncounterSets } = encounterSet.actions;

export const { selectEncounterSets } = encounterSet.selectors;

export default encounterSet.reducer;
