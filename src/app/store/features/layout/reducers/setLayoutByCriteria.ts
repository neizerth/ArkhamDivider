import { PayloadAction, CaseReducer } from "@reduxjs/toolkit";
import { ILayoutState } from "../layout";
import { ILayoutCriteria } from "@/shared/types/layouts";
import { getLayoutByCriteria } from "@/shared/lib/features/layouts/getLayoutByCriteria";

export const setLayoutByCriteria: CaseReducer<ILayoutState, PayloadAction<ILayoutCriteria>> = 
  (state, { payload: criteria }) => {
    const layout = getLayoutByCriteria({
      ...state,
      criteria
    });

    if (!layout) {
      return;
    }

    state.layout = layout;
  }