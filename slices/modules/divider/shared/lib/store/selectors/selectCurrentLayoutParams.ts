import { createSelector } from "@reduxjs/toolkit";
import { selectLayoutId, selectLayoutParams } from "../divider";

export const selectCurrentLayoutParams = createSelector(
	[selectLayoutParams, selectLayoutId],
	(layoutParams, layoutId) => {
		if (!layoutParams || !layoutId) {
			return null;
		}
		return layoutParams[layoutId];
	},
);
