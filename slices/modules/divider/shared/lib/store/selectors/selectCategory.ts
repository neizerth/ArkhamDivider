import { createSelector } from "@reduxjs/toolkit";
import { dividerCategories } from "@/modules/divider/entities/items";
import { whereId } from "@/shared/util";
import { selectCategoryId } from "../divider";

export const selectCategory = createSelector(
	[selectCategoryId],
	(categoryId) => {
		if (!categoryId) {
			return null;
		}
		return dividerCategories.find(whereId(categoryId));
	},
);
