import { createSelector } from "@reduxjs/toolkit";
import { selectLayout } from "../../../../entities/lib/store/selectors/layout/selectLayout";
import { selectCategory } from "../../../../entities/lib/store/selectors/selectCategory";

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
