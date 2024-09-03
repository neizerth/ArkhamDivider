import { PayloadAction } from '@reduxjs/toolkit';

export const createSliceSetter = <State, K extends keyof State>(name: K) => 
    (state: State, { payload }: PayloadAction<State[K]>) => {
        state[name] = payload;
    };

export const createSliceSelector = <State, K extends keyof State>(name: K) =>
    (state: State) => state[name];
