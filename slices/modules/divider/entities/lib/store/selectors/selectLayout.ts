import { createSelector } from "@reduxjs/toolkit";
import { dividerLayouts } from "@/modules/divider/entities/items/data";
import { selectLayoutId } from "@/modules/divider/shared/lib";
import { whereId } from "@/shared/util";

export const selectLayout = createSelector([selectLayoutId], (layoutId) => {
	if (!layoutId) {
		return null;
	}
	return dividerLayouts.find(whereId(layoutId));
});
