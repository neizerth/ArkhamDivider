import { createSelector } from "@reduxjs/toolkit";
import { selectLayout } from "./selectLayout";

export const selectLayoutBleed = createSelector([selectLayout], (layout) => {
	return layout?.bleed ?? 0;
});
