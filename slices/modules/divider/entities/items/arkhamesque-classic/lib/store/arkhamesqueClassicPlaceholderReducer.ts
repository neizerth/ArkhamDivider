import type { Reducer } from "@reduxjs/toolkit";
import type { ArkhamesqueClassicState } from "./arkhamesqueClassic";

const initialState: ArkhamesqueClassicState = {
	arkhamesqueClassicData: null,
};

/**
 * Holds a stable `arkhamesqueClassic` root key so redux-persist rehydration never
 * sees “unknown” keys before `injectReducer` swaps in the real slice reducer.
 */
export const arkhamesqueClassicPlaceholderReducer: Reducer<
	ArkhamesqueClassicState
> = (state = initialState) => state;
