import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@/shared/store";
import { selectDividerById } from "../dividers";

export const selectDividerParam = <T>(state: RootState, key: string) =>
	selector(state, key) as T | undefined;

const selector = createSelector(
	[selectDividerById, (_: RootState, key: string) => key],
	(divider, param) => {
		return divider.params?.[param];
	},
);
