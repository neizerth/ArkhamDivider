import { createAction } from "@reduxjs/toolkit";
import type { GenerateDividersMode } from "@/modules/divider/shared/model";

export type GenerateScenarioDividersPayload = {
	mode: GenerateDividersMode;
} & GenerateScenarioDividersParams;

export type GenerateScenarioDividersParams = {
	campaignDivider: boolean;
	encounterDividers: boolean;
	scenarioDividers: boolean;
	scenarioEncounterDividers: boolean;
	campaignIcon: boolean;
	encounterSize: boolean;
	scenarioSize: boolean;
	extraEncounterSets: boolean;
};

export const generateScenarioDividers =
	createAction<GenerateScenarioDividersPayload>(
		`divider/generateScenarioDividers`,
	);
