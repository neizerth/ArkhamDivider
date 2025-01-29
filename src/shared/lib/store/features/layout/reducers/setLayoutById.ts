import { getLayouts } from "@/shared/lib/features/layouts/common";
import type { CaseReducer, PayloadAction } from "@reduxjs/toolkit";
import type { ILayoutState } from "../layout";

export const setLayoutById: CaseReducer<ILayoutState, PayloadAction<string>> = (
	state,
	{ payload: id },
) => {
	const criteria = { id };
	const [layout] = getLayouts({ criteria });

	if (!layout) {
		return;
	}

	state.layout = layout;
};
