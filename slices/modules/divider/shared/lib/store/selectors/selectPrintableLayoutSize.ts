import { createSelector } from "@reduxjs/toolkit";
import { mmSize } from "@/modules/print/shared/config/bleed";
import { selectBleedEnabled, selectDPI } from "@/modules/print/shared/lib";
import { selectLayout } from "./selectLayout";

export const selectPrintableLayoutSize = createSelector(
	[selectDPI, selectLayout, selectBleedEnabled],
	(dpi, layout, bleedEnabled) => {
		if (!layout) {
			return;
		}
		const printSize = layout.printSize[dpi];

		if (!printSize) {
			return;
		}
		const mm = mmSize[dpi];

		const size = bleedEnabled ? printSize.bleedSize : printSize.size;

		const originalBleed = layout.bleed * mm;
		const currentBleed = bleedEnabled ? originalBleed : 0;
		return {
			mm,
			area: printSize.size,
			size,
			bleedEnabled,
			originalBleed,
			currentBleed,
		};
	},
);
