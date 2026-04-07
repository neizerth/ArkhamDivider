import { createAction } from "@reduxjs/toolkit";

export type LayoutOrientation = "horizontal" | "vertical";

export const changeLayoutOrientation = createAction<LayoutOrientation>(
	`divider/changeLayoutOrientation`,
);
