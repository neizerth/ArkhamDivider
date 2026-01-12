import { createSlice } from "@reduxjs/toolkit";
import type { Location } from "react-router";
import { createSliceState } from "redux-toolkit-helpers";

export type RouterState = {
	location: Location | null;
};

const initialState: RouterState = {
	location: null,
};

export const router = createSlice({
	name: "router",
	...createSliceState(initialState),
});

export const { setLocation } = router.actions;

export const { selectLocation } = router.selectors;

export default router.reducer;
