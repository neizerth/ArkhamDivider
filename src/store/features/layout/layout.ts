import { LayoutType } from "@/types/layouts";
import { createSliceSelector, createSliceSetter } from '@/util/slice';
import { createSlice } from '@reduxjs/toolkit';

import { layouts } from '@/data/layouts';
import { ILayout } from '@/types/layouts';
import * as reducers from './reducers';

const DEFAULT_LAYOUT = layouts.find(({ is_default }) => is_default) as ILayout;

export type ILayoutState = {
  layout: ILayout,
  color: boolean,
  type: LayoutType,
  categoryId?: string,
}

const initialState: ILayoutState = {
  layout: DEFAULT_LAYOUT,
  color: true,
  type: LayoutType.SCENARIO,
};

export const layout = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    ...reducers,
    setLayout: createSliceSetter('layout'),
    setType: createSliceSetter('type'),
    setColor: createSliceSetter('color'),
    setCategoryId: createSliceSetter('categoryId'),
  },
  selectors: {
    selectLayout: createSliceSelector('layout'),
    selectType: createSliceSelector('type'),
    selectCategoryId: createSliceSelector('categoryId'),
  },
  extraReducers(builder) {
    builder
      .addCase(setCategoryId, (state, action) => {
        const categoryId = action.payload;

        reducers.setLayoutByCriteria(state, {
          ...action,
          payload: { categoryId }
        });
      })
      .addCase(setType, (state, action) => {
        const type = action.payload;

        reducers.setLayoutByCriteria(state, {
          ...action,
          payload: { type }
        });
      })
  }
});

export const {
  setLayout,
  setColor,
  setType,
  setCategoryId,
  setLayoutByCriteria,
  setLayoutById
} = layout.actions;

export const {
  selectLayout,
  selectType,
  selectCategoryId
} = layout.selectors;

export default layout.reducer;