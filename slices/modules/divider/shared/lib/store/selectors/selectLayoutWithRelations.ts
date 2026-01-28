import { createSelector } from "@reduxjs/toolkit";
import { selectCategory } from "./selectCategory";
import { selectLayout } from "./selectLayout";

export const selectLayoutWithRelations = createSelector(
	[selectLayout, selectCategory],
	(layout, category) => {
		if (!layout || !category) {
			return null;
		}
		return {
			...layout,
			authors: layout.authors ?? category.authors,
			category,
		};
	},
);
