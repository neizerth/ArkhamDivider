import { createSelector } from "@reduxjs/toolkit";
import { dividerCategories } from "@/modules/divider/entities/items/data";
import { selectCategoryId } from "@/modules/divider/shared/lib";
import { whereId } from "@/shared/util";

export const selectCategory = createSelector(
	[selectCategoryId],
	(categoryId) => {
		if (!categoryId) {
			return null;
		}
		return dividerCategories.find(whereId(categoryId));
	},
);
