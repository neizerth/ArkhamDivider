import { fetchArkhamesqueData } from "@/shared/api/arkhamesqueClassic";
import type { AppThunk } from "@/shared/store";
import {
	createSliceSelector,
	createSliceSetter,
} from "@/shared/lib/features/util/slice";
import {
	type ActionCreator,
	createSelector,
	createSlice,
} from "@reduxjs/toolkit";
import type { IArkhamesqueBuild } from "arkhamesque-classic-divider-data";
import { prop } from "ramda";

export type IArkhamesqueState = {
	data: IArkhamesqueBuild | null;
};

const initialState: IArkhamesqueState = {
	data: null,
};

export const arkhamesque = createSlice({
	name: "arkhamesque",
	initialState,
	reducers: {
		setArkhamesqueData: createSliceSetter("data"),
	},
	selectors: {
		selectArkhamesqueData: createSliceSelector("data"),
	},
});

export const loadArkhamesqueData: ActionCreator<AppThunk> =
	() => async (dispatch, getState) => {
		const state = getState();
		const currentData = selectArkhamesqueData(state);
		if (currentData) {
			return;
		}
		const data = await fetchArkhamesqueData();
		dispatch(setArkhamesqueData(data));
	};

export const { setArkhamesqueData } = arkhamesque.actions;

export const { selectArkhamesqueData } = arkhamesque.selectors;

export const selectArkhamesqueClassicInvestigators = createSelector(
	[selectArkhamesqueData],
	(arkhamesqueData) => {
		if (!arkhamesqueData) {
			return [];
		}
		return arkhamesqueData.investigators.flatMap(({ data }) =>
			data.map(prop("code")),
		);
	},
);

export default arkhamesque.reducer;
