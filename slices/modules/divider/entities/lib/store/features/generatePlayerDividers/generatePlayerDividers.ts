import { createAction } from "@reduxjs/toolkit";
import type {
	GenerateDividersMode,
	PlayerDividerParams,
} from "@/modules/divider/shared/model";

type GeneratePlayerDividersPayload = {
	mode: GenerateDividersMode;
} & PlayerDividerParams;

export const generatePlayerDividers =
	createAction<GeneratePlayerDividersPayload>(`divider/generatePlayerDividers`);
