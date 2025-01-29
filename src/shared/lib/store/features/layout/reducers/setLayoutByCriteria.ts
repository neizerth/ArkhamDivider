import { getLayoutByCriteria } from "@/shared/lib/features/layouts/getLayoutByCriteria";
import type { ILayoutCriteria } from "@/shared/model/types/layouts";
import type { CaseReducer, PayloadAction } from "@reduxjs/toolkit";
import type { ILayoutState } from "../layout";

export const setLayoutByCriteria: CaseReducer<
	ILayoutState,
	PayloadAction<ILayoutCriteria>
> = (state, { payload: criteria }) => {
	const layout = getLayoutByCriteria({
		...state,
		criteria,
	});

	if (!layout) {
		return;
	}

	state.layout = layout;
};
