import { createSelector } from "@reduxjs/toolkit";
import { selectScenarioParams } from "../divider";
import { selectDividers } from "../dividers";

export const selectShowCardsCount = createSelector(
	[(_, id: string) => id, selectScenarioParams, selectDividers],
	(id, params, dividers) => {
		const divider = dividers.find((divider) => divider.id === id);

		if (!divider) {
			return false;
		}

		return (
			(params.encounterSize && divider.type === "encounter") ||
			(params.scenarioSize && divider.type === "scenario")
		);
	},
);
