import { ActionCreator, createSlice } from '@reduxjs/toolkit';
import { createSliceState } from 'redux-toolkit-helpers';

import { layouts } from '@/shared/data/layouts';
import { arkhamesqueCategory } from '@/shared/data/layouts/arkhamesque';
import { getLayouts } from '@/shared/lib/features/layouts/common';
import { safePropEq } from '@/shared/lib/features/util/criteria';
import { AppSelector, AppThunk } from '@/shared/store';
import { ILayout, LayoutType } from '@/shared/types/layouts';
import { Nullable } from '@/shared/types/util';
import * as reducers from './reducers';

export const DEFAULT_LAYOUT = layouts.find(safePropEq(true, 'isDefault')) as ILayout;

export type ILayoutState = {
  layout: ILayout;
  color: boolean;
  type: LayoutType;
  categoryId: Nullable<string>;
  zoom: number;
};

const initialState: ILayoutState = {
  categoryId: null,
  layout: DEFAULT_LAYOUT,
  color: true,
  type: LayoutType.SCENARIO,
  zoom: 100,
};

const sliceState = createSliceState(initialState);

export const layout = createSlice({
  name: 'layout',
  ...sliceState,
  reducers: {
    ...sliceState.reducers,
    ...reducers,
  },
});

export const setLayoutById: ActionCreator<AppThunk> = (id: string) => (dispatch) => {
  const criteria = { id };
  const [layout] = getLayouts({ criteria });

  if (!layout) {
    return;
  }

  dispatch(setLayout(layout));
};

export const selectIsArkhamesqueLayout: AppSelector<boolean> = (state) => {
  const { layout, categoryId: defaultCategoryId } = state.layout;
  const categoryId = defaultCategoryId || layout.categoryId;

  return categoryId === arkhamesqueCategory.id;
};

export const { setLayout, setColor, setType, setCategoryId, setLayoutByCriteria, setZoom } =
  layout.actions;

export const { selectLayout, selectType, selectCategoryId, selectZoom } = layout.selectors;

export default layout.reducer;
