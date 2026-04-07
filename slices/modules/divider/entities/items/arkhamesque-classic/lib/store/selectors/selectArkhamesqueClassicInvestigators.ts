import { createSelector } from "@reduxjs/toolkit";
import { getArkhamesqueClassicInvestigators } from "../../logic";
import { selectArkhamesqueClassicData } from "../arkhamesqueClassic";

export const selectArkhamesqueClassicInvestigators = createSelector(
	[selectArkhamesqueClassicData],
	(data) => {
		if (!data) {
			return [];
		}
		return getArkhamesqueClassicInvestigators(data);
	},
);
