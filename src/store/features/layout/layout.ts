import { LayoutType } from '@/types/dividers';
import { createSliceSelector, createSliceSetter } from '@/util/slice';
import { createSlice } from '@reduxjs/toolkit';

import { layouts } from '@/data/layouts';
import { ILayout } from '@/types/layouts';

const DEFAULT_LAYOUT = layouts.find(({ is_default }) => is_default) as ILayout;

export type ILayoutState = {
  layout: ILayout,
  type: LayoutType,
}

const initialState: ILayoutState = {
  layout: DEFAULT_LAYOUT,
  type: LayoutType.HORIZONTAL
};

export const layout = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    setLayout: createSliceSetter('layout'),
    setType: createSliceSetter('type')
  },
  selectors: {
    selectLayout: createSliceSelector('layout'),
    selectType: createSliceSelector('type')
  }
});

export const {
  setType,
  setLayout
} = layout.actions;

export const {
  selectType,
  selectLayout
} = layout.selectors;

export default layout.reducer;