import { createAction } from "@reduxjs/toolkit";

export const downloadDividerAsImage = createAction<string>(
	`divider/downloadDividerAsImage`,
);
