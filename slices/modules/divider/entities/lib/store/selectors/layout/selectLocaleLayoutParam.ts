import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@/shared/store";
import { selectLocaleLayoutParams } from "./selectLocaleLayoutParams";

export const selectLocaleLayoutParam =
	<T = unknown>(param: string) =>
	(state: RootState) =>
		selector(state, param) as T | undefined;

const selector = createSelector(
	[selectLocaleLayoutParams, (_: RootState, param: string) => param],
	(currentLayoutParams, param) => {
		if (!currentLayoutParams || !param) {
			return;
		}
		return currentLayoutParams[param];
	},
);
