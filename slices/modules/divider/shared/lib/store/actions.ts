import { createAction } from "@reduxjs/toolkit";
import type { DividerLayoutType } from "../../model/layout";

export const changeDividerType =
	createAction<DividerLayoutType>("divider/changeType");
