import { createSelector } from "@reduxjs/toolkit";
import { isNumber } from "ramda-adjunct";
import { selectRenderProgress, selectRenderProgressTotal } from "../render";

export const selectRenderProgressValue = createSelector(
	[selectRenderProgress, selectRenderProgressTotal],
	(renderProgress, renderProgressTotal) => {
		if (!isNumber(renderProgress) || !isNumber(renderProgressTotal)) {
			return;
		}
		return Math.round((renderProgress / renderProgressTotal) * 100);
	},
);
