import { createAction } from "@reduxjs/toolkit";
import type { ArkhamDivider } from "arkham-divider-data";

export const appStarted = createAction("app/started");

export const appDataLoaded = createAction<ArkhamDivider.Core>("app/dataLoaded");

export const appTranslationsLoaded = createAction<ArkhamDivider.Translation>(
	"app/translationsLoaded",
);
