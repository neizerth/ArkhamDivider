import { createAction } from "@reduxjs/toolkit";
import type { DividerLayoutType } from "../../model/layout";

export const changeDividerType =
	createAction<DividerLayoutType>("divider/changeType");

export const changeLayoutId = createAction<string>(`divider/changeLayoutId`);
