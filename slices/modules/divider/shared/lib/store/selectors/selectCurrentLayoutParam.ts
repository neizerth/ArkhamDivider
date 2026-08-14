import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@/shared/store";
import { selectCurrentLayoutParams } from "./selectCurrentLayoutParams";

export const selectCurrentLayoutParam = <T = unknown>(param: string) => {
	return (state: RootState) => selector(state, param) as T | null;
};

const selector = createSelector(
	[selectCurrentLayoutParams, (_: RootState, param: string) => param],
	(layoutParams, param) => {
		if (!layoutParams || !param) {
			return null;
		}
		return layoutParams[param];
	},
);
