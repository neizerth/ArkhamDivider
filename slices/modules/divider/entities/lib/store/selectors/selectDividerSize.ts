import { createSelector } from "@reduxjs/toolkit";
import { selectBleedEnabled, selectDPI } from "@/modules/print/shared/lib";
import { selectLayout } from "./layout/selectLayout";

export const selectDividerSize = createSelector(
	[selectLayout, selectBleedEnabled, selectDPI],
	(layout, bleedEnabled, dpi) => {
		if (!layout) {
			return;
		}
		const printSize = layout.printSize[dpi];
		if (!printSize) {
			return;
		}
		if (bleedEnabled) {
			return printSize.bleedSize;
		}
		return printSize.size;
	},
);
