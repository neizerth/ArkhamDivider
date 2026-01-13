import { createAction } from "@reduxjs/toolkit";

export const changeLanguageBundle = createAction<string>(
	"i18n/changeLanguageBundle",
);
