import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@/shared/store";
import { selectDividerById } from "../dividers";

type Options = {
	id: string;
	key: string;
};

export const selectDividerParam =
	<T>({ id, key }: Options) =>
	(state: RootState) =>
		selector(state, id, key) as T | undefined;

const selector = createSelector(
	[selectDividerById, (_: RootState, _id: string, key: string) => key],
	(divider, param) => {
		return divider.params?.[param];
	},
);
