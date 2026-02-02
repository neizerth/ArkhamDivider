import { createSelector } from "@reduxjs/toolkit";
import { selectCategory } from "../../../../entities/lib/store/selectors/selectCategory";
import { selectLayout } from "../../../../entities/lib/store/selectors/selectLayout";

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
