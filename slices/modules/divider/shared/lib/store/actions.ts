import { createAction } from "@reduxjs/toolkit";
import type { DividerLayoutType } from "../../model/layout";

export const changeDividerType =
	createAction<DividerLayoutType>("divider/changeType");

export const changeLayoutId = createAction<string>(`divider/changeLayoutId`);

export const changeCategoryId = createAction<string | null>(
	`divider/changeCategoryId`,
);

export const categoryIdChanged = createAction<{
	prevCategoryId: string | null;
	newCategoryId: string | null;
}>(`divider/categoryIdChanged`);
