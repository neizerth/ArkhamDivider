import { createSelector } from "@reduxjs/toolkit";
import { selectCurrentLayoutParams } from "@/modules/divider/shared/lib";
import type { RootState } from "@/shared/store";

export const selectGlobalLayoutParams = <T = Record<string, unknown>>(
	state: RootState,
) => selector(state) as T | null;

const selector = createSelector(
	[selectCurrentLayoutParams],
	(currentLayoutParams) => {
		if (!currentLayoutParams) {
			return null;
		}
		return currentLayoutParams.global;
	},
);
