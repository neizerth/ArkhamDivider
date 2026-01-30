import {
	createEntityAdapter,
	createSlice,
	type PayloadAction,
} from "@reduxjs/toolkit";
import { v4 } from "uuid";
import type { RootState } from "@/shared/store";
import type { Divider } from "../../model";

const adapter = createEntityAdapter<Divider>();

const initialState = adapter.getInitialState();

export const dividers = createSlice({
	name: "dividers",
	initialState,
	reducers: {
		setDividerParam: (
			state,
			action: PayloadAction<{ id: string; key: string; value: unknown }>,
		) => {
			const { id, key, value } = action.payload;
			const entity = state.entities[id];
			if (!entity) {
				return;
			}
			const prevParams = entity.params as Record<string, unknown> | undefined;
			state.entities[id] = {
				...entity,
				params: {
					...(prevParams ?? {}),
					[key]: value,
				},
			} as unknown as Divider;
		},
		setDividers: adapter.setAll,
		addDivider: adapter.addOne,
		updateDivider: adapter.updateOne,
		deleteDivider: adapter.removeOne,
		addManyDividers: adapter.addMany,
		copyDivider(
			state,
			action: PayloadAction<{ id: string; params?: Partial<Divider> }>,
		) {
			const { id, params } = action.payload;
			const divider = adapter.getSelectors().selectById(state, id);
			if (!divider) {
				return;
			}
			const newId = v4();
			const data = {
				...divider,
				...params,
				id: newId,
			} as Divider;

			const sourceIndex = state.ids.indexOf(id);
			state.ids.splice(sourceIndex + 1, 0, newId);
			state.entities[newId] = data;
		},
	},
});

const selectors = adapter.getSelectors<RootState>((state) => state.dividers);

export const {
	setDividers,
	addDivider,
	updateDivider,
	deleteDivider,
	addManyDividers,
	copyDivider,
	setDividerParam,
} = dividers.actions;

export const {
	selectAll: selectDividers,
	selectById: selectDividerById,
	selectIds: selectDividerIds,
} = selectors;

export default dividers.reducer;
