import { LayoutType } from "@/types/layouts";
import { createSliceSelector, createSliceSetter } from '@/util/slice';
import { createSlice } from '@reduxjs/toolkit';

import { layouts } from '@/data/layouts';
import { ILayout } from '@/types/layouts';
import * as reducers from './reducers';
import { safePropEq } from "@/util/criteria";

const DEFAULT_LAYOUT = layouts.find(safePropEq(true, 'isDefault')) as ILayout;

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
    setColor: createSliceSetter('color'),

    setCategoryId: createSliceSetter('categoryId'),
    setType: createSliceSetter('type'),
  },
  selectors: {
    selectLayout: createSliceSelector('layout'),
    selectType: createSliceSelector('type'),
    selectCategoryId: createSliceSelector('categoryId'),
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