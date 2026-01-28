import { createAction } from "@reduxjs/toolkit";
import type {
	GenerateDividersMode,
	ScenarioDividerParams,
} from "@/modules/divider/shared/model";

export type GenerateScenarioDividersPayload = {
	mode: GenerateDividersMode;
} & ScenarioDividerParams;

export const generateScenarioDividers =
	createAction<GenerateScenarioDividersPayload>(
		`divider/generateScenarioDividers`,
	);
