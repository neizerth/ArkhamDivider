import { createSelector } from "@reduxjs/toolkit";
import { dividerLayouts } from "@/modules/divider/entities/items";
import { whereId } from "@/shared/util";
import { selectLayoutId } from "../divider";

export const selectLayout = createSelector([selectLayoutId], (layoutId) => {
	if (!layoutId) {
		return null;
	}
	return dividerLayouts.find(whereId(layoutId));
});
