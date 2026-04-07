import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@/shared/store";
import { selectIcons } from "../icons";

export const selectIconById = createSelector(
	[selectIcons, (_: RootState, id: string) => id],
	(icons, id) => {
		return icons[id];
	},
);
