import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@/shared/store";
import {
	selectInvestigatorParams,
	selectPlayerParams,
	selectScenarioParams,
} from "../divider";
import { selectDividerById } from "../dividers";

export const selector = createSelector(
	[
		selectDividerById,
		selectScenarioParams,
		selectPlayerParams,
		selectInvestigatorParams,
	],
	(divider, scenarioParams, playerParams, investigatorParams) => {
		if (divider.type === "scenario") {
			return scenarioParams.campaignIcon;
		}

		if (divider.type === "player") {
			return playerParams.campaignIcon;
		}

		if (divider.type === "investigator") {
			return investigatorParams.campaignIcon;
		}

		return false;
	},
);

export const selectShowDividerCampaignIcon =
	(dividerId: string) => (state: RootState) => {
		return selector(state, dividerId);
	};
