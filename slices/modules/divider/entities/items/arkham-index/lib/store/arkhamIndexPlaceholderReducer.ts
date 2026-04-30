import type { Reducer } from "@reduxjs/toolkit";
import type { ArkhamIndexState } from "./arkhamIndex";

const initialState: ArkhamIndexState = {
	arkhamIndexData: null,
};

/**
 * Holds a stable `arkhamesqueClassic` root key so redux-persist rehydration never
 * sees “unknown” keys before `injectReducer` swaps in the real slice reducer.
 */
export const arkhamIndexPlaceholderReducer: Reducer<ArkhamIndexState> = (
	state = initialState,
) => state;
