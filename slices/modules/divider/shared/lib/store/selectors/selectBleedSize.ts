import { createSelector } from "@reduxjs/toolkit";
import { selectBleedEnabled } from "@/modules/print/shared/lib";
import { selectLayout } from "../../../../entities/lib/store/selectors/selectLayout";

export const selectBleedSize = createSelector(
	[selectLayout, selectBleedEnabled],
	(layout, bleedEnabled) => {
		if (!layout) {
			return 0;
		}
		return bleedEnabled ? layout.bleed : 0;
	},
);
