import { createSelector } from "@reduxjs/toolkit";
import { selectLanguage } from "@/modules/core/i18n/shared/lib";
import { selectCurrentLayoutParams } from "@/modules/divider/shared/lib";
import type { RootState } from "@/shared/store";

export const selectLocaleLayoutParams = <T = Record<string, unknown>>(
	state: RootState,
) => selector(state) as T | null;

const selector = createSelector(
	[selectCurrentLayoutParams, selectLanguage],
	(currentLayoutParams, language) => {
		if (!currentLayoutParams || !language) {
			return null;
		}
		return currentLayoutParams[language];
	},
);
