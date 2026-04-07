import { createSlice } from "@reduxjs/toolkit";
import type { IArkhamesqueBuild } from "arkhamesque-classic-divider-data";
import { createSliceState } from "redux-toolkit-helpers";

export type ArkhamesqueClassicState = {
	arkhamesqueClassicData: IArkhamesqueBuild | null;
};

const initialState: ArkhamesqueClassicState = {
	arkhamesqueClassicData: null,
};

export const arkhamesqueClassic = createSlice({
	name: "arkhamesqueClassic",
	...createSliceState(initialState),
});

export const { setArkhamesqueClassicData } = arkhamesqueClassic.actions;

export const { selectArkhamesqueClassicData } = arkhamesqueClassic.selectors;

export default arkhamesqueClassic.reducer;

declare module "@/shared/store" {
	interface LazyInjectedState {
		arkhamesqueClassic: ArkhamesqueClassicState;
	}
}
