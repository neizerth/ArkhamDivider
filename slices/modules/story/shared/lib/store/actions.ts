import { createAction } from "@reduxjs/toolkit";

export const changeStoryCode = createAction<string | null>("story/changeCode");
