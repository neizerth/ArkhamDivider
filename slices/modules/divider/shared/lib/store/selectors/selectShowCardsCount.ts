import { createSelector } from "@reduxjs/toolkit";
import { selectScenarioParams } from "../divider";
import { selectDividerById } from "../dividers";

export const selectShowCardsCount = createSelector(
	[selectDividerById, selectScenarioParams],
	(divider, params) => {
		if (!divider) {
			return false;
		}

		return (
			(params.encounterSize && divider.type === "encounter") ||
			(params.scenarioSize && divider.type === "scenario") ||
			(params.campaignSize && divider.type === "campaign")
		);
	},
);
