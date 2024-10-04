import { PayloadAction } from "@reduxjs/toolkit";

export const createSliceSetter = <State, K extends keyof State>(
    name: K, 
    onSet?: (state: State, action: PayloadAction<State[K]>) => void
) => 
    (state: State, action: PayloadAction<State[K]>) => {
        const { payload } = action;
        state[name] = payload;
        if (!onSet) {
            return;
        }
        onSet(state, action);
    };

export const createSliceSelector = <State, K extends keyof State>(name: K) =>
    (state: State) => state[name];
