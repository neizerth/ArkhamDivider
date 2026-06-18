import { createAction } from "@reduxjs/toolkit";
import type { FontFamily } from "@/shared/model";

export const setLayoutFontFamily = createAction<FontFamily>(
	`divider/setLayoutFontFamily`,
);
