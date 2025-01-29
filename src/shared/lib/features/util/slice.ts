import type { PayloadAction } from "@reduxjs/toolkit";

export const createSliceSetter =
	<State, K extends keyof State>(
		name: K,
		onSet?: (
			state: State,
			action: PayloadAction<State[K]>,
		) => Partial<State[K]> | undefined,
	) =>
	(state: State, action: PayloadAction<State[K]>) => {
		const { payload } = action;
		state[name] = payload;
		if (!onSet) {
			return;
		}
		const update = onSet(state, action) || {};

		return {
			...state,
			...update,
		};
	};

export const createSliceSelector =
	<State, K extends keyof State>(name: K) =>
	(state: State) =>
		state[name];
