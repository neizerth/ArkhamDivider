import { getLayouts } from "@/features/layouts/common";
import { CaseReducer, PayloadAction } from "@reduxjs/toolkit";
import { ILayoutState } from "../layout";

export const setLayoutById: CaseReducer<ILayoutState, PayloadAction<string>> = 
  (state, { payload: id }) => {
    const criteria = { id };
    const [layout] = getLayouts({ criteria });

    if (!layout) {
      return;
    }

    state.layout = layout;
  }
