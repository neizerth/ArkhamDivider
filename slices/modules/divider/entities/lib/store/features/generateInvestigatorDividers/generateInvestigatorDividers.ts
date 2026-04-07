import { createAction } from "@reduxjs/toolkit";
import type {
	GenerateDividersMode,
	InvestigatorDividerParams,
} from "@/modules/divider/shared/model";

type GenerateInvestigatorDividersPayload = {
	mode: GenerateDividersMode;
} & InvestigatorDividerParams;

export const generateInvestigatorDividers =
	createAction<GenerateInvestigatorDividersPayload>(
		`divider/generateInvestigatorDividers`,
	);
