import { createAction } from "@reduxjs/toolkit";
import type { DividerLayoutType } from "./layout";

export const changeDividerType =
	createAction<DividerLayoutType>("divider/changeType");
