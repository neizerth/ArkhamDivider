import { createSelector } from "@reduxjs/toolkit";
import { getDividerType } from "../../logic";
import { selectDividerType } from "../divider";

export const selectCurrentDividerType = createSelector(
	selectDividerType,
	(type) => getDividerType(type),
);
