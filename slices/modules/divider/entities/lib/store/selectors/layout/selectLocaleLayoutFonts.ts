import { createSelector } from "@reduxjs/toolkit";
import { selectLanguage } from "@/modules/core/i18n/shared/lib";
import type { FontFamily } from "@/shared/model";
import { selectLayout } from "./selectLayout";

const EMPTY: FontFamily[] = [];

export const selectLocaleLayoutFonts = createSelector(
	[selectLayout, selectLanguage],
	(layout, language) => {
		if (!layout || !language) {
			return EMPTY;
		}
		return layout.fontFamilySelection?.[language] ?? EMPTY;
	},
);
