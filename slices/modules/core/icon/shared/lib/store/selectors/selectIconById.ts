import { createSelector } from "@reduxjs/toolkit";
import { isString } from "ramda-adjunct";
import type { RootState } from "@/shared/store";
import { selectIcons } from "../icons";

export const selectIconById = createSelector(
	[selectIcons, (_: RootState, id?: unknown) => id],
	(icons, id) => {
		if (!isString(id)) {
			return;
		}
		return icons[id];
	},
);
