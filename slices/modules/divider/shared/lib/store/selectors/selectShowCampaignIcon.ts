import { createSelector } from "@reduxjs/toolkit";
import { selectScenarioParams } from "../divider";

export const selectShowCampaignIcon = createSelector(
	[selectScenarioParams],
	(scenarioParams) => scenarioParams.campaignIcon,
);
