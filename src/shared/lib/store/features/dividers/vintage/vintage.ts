import type { TabPosition } from "@/components/dividers/vintage/VintageDivider/features/tabPosition";
import type { AppThunk } from "@/shared/lib/store";
import {
	selectDividers,
	setDividers,
} from "@/shared/lib/store/features/dividers/dividers";
import type { ActionCreator } from "@reduxjs/toolkit";

export const moveTab: ActionCreator<AppThunk> =
	(id: string, tabPosition: TabPosition) => (dispatch, getState) => {
		const state = getState();
		const dividers = selectDividers(state);

		const data = dividers.map((divider) => {
			if (divider.id === id) {
				return {
					...divider,
					customParams: {
						tabPosition,
					},
				};
			}

			return divider;
		});

		dispatch(setDividers(data));
	};
