import { TabPosition } from "@/components/dividers/vintage/VintageDivider/features/tabPosition";
import { ActionCreator } from "@reduxjs/toolkit";
import {
	selectDividers,
	setDividers,
} from "@/shared/lib/store/features/dividers/dividers";
import { AppThunk } from "@/shared/lib/store";

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
