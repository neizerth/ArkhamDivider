import { createSlice } from "@reduxjs/toolkit";
import type { Location, Params } from "react-router";
import { createSliceState } from "redux-toolkit-helpers";

export type RouterState = {
	location: Location | null;
	locationParams: Readonly<Params<string>> | null;
};

const initialState: RouterState = {
	location: null,
	locationParams: null,
};

export const router = createSlice({
	name: "router",
	...createSliceState(initialState),
});

export const { setLocation, setLocationParams } = router.actions;

export const { selectLocation, selectLocationParams } = router.selectors;

export default router.reducer;
