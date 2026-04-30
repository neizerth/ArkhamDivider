import { createSlice } from "@reduxjs/toolkit";
import { createSliceState } from "redux-toolkit-helpers";
import type { ArkhamIndexDividerData } from "../../model";

export type ArkhamIndexState = {
	arkhamIndexData: ArkhamIndexDividerData | null;
};

const initialState: ArkhamIndexState = {
	arkhamIndexData: null,
};

export const arkhamIndex = createSlice({
	name: "arkhamIndex",
	...createSliceState(initialState),
});

export const { setArkhamIndexData } = arkhamIndex.actions;

export const { selectArkhamIndexData } = arkhamIndex.selectors;

export default arkhamIndex.reducer;

declare module "@/shared/store" {
	interface LazyInjectedState {
		arkhamIndex: ArkhamIndexState;
	}
}
