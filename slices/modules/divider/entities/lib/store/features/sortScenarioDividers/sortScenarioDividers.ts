import { createAction } from "@reduxjs/toolkit";
import type { ScenarioDividerSortBy } from "@/modules/divider/shared/model";

export const sortScenarioDividers = createAction<ScenarioDividerSortBy>(
	`divider/sortScenarioDividers`,
);
