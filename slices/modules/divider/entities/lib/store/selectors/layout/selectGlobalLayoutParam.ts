import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@/shared/store";
import { selectGlobalLayoutParams } from "./selectGlobalLayoutParams";

export const selectGlobalLayoutParam =
	<T = unknown>(param: string) =>
	(state: RootState) =>
		selector(state, param) as T | undefined;

const selector = createSelector(
	[selectGlobalLayoutParams, (_: RootState, param: string) => param],
	(currentLayoutParams, param) => {
		if (!currentLayoutParams || !param) {
			return;
		}
		return currentLayoutParams[param];
	},
);
