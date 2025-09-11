import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import { getLayoutByCriteria } from '@/shared/lib/features/layouts/getLayoutByCriteria';
import { ILayoutCriteria } from '@/shared/types/layouts';
import { ILayoutState } from '../layout';

export const setLayoutByCriteria: CaseReducer<ILayoutState, PayloadAction<ILayoutCriteria>> = (
  state,
  { payload: criteria }
) => {
  const layout = getLayoutByCriteria({
    ...state,
    criteria,
  });

  if (!layout) {
    return;
  }

  state.layout = layout;
};
