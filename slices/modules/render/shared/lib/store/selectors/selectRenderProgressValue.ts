import { createSelector } from "@reduxjs/toolkit";
import { selectRenderProgress, selectRenderProgressTotal } from "../render";

export const selectRenderProgressValue = createSelector(
	[selectRenderProgress, selectRenderProgressTotal],
	(renderProgress, renderProgressTotal) => {
		if (!renderProgress || !renderProgressTotal) {
			return;
		}
		return Math.round((renderProgress / renderProgressTotal) * 100);
	},
);
