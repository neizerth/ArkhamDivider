import {
	createEntityAdapter,
	createSlice,
	type PayloadAction,
} from "@reduxjs/toolkit";
import { v4 } from "uuid";
import type { Divider } from "../../model";

const adapter = createEntityAdapter<Divider>();

export const dividers = createSlice({
	name: "dividers",
	initialState: adapter.getInitialState(),
	reducers: {
		setDividers: adapter.setAll,
		addDivider: adapter.addOne,
		updateDivider: adapter.updateOne,
		deleteDivider: adapter.removeOne,
		addManyDividers: adapter.addMany,
		copyDivider(
			state,
			action: PayloadAction<{ id: string; params: Partial<Divider> }>,
		) {
			const { id, params } = action.payload;
			const divider = adapter.getSelectors().selectById(state, id);
			if (!divider) {
				return;
			}
			const data = {
				...divider,
				...params,
				id: v4(),
			} as Divider;

			adapter.addOne(state, data);
		},
	},
});

const selectors = adapter.getSelectors();

export const {
	setDividers,
	addDivider,
	updateDivider,
	deleteDivider,
	addManyDividers,
} = dividers.actions;

export const { selectAll: selectAllDividers, selectById: selectDividerById } =
	selectors;

export default dividers.reducer;
