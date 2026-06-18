import { createSelector } from "@reduxjs/toolkit";
import type { FontFamily } from "@/shared/model";
import { selectLocaleLayoutParams } from "./selectLocaleLayoutParams";

export const selectLayoutFontFamily = createSelector(
	[selectLocaleLayoutParams],
	(params) => {
		return params?.fontFamily as FontFamily | undefined;
	},
);
