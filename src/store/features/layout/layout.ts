import { LayoutOrientation, LayoutType } from "@/types/layouts";
import { createSliceSelector, createSliceSetter } from '@/util/slice';
import { createSlice } from '@reduxjs/toolkit';

import { layouts } from '@/data/layouts';
import { ILayout } from '@/types/layouts';

const DEFAULT_LAYOUT = layouts.find(({ is_default }) => is_default) as ILayout;

export type ILayoutState = {
  layout: ILayout,
  color: boolean,
  type: LayoutType,
  orientation: LayoutOrientation,
}

const initialState: ILayoutState = {
  layout: DEFAULT_LAYOUT,
  color: true,
  type: LayoutType.SCENARIO,
  orientation: LayoutOrientation.HORIZONTAL
};

export const layout = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    setLayout: createSliceSetter('layout'),
    setOrientation: createSliceSetter('orientation'),
    setType: createSliceSetter('type'),
    setColor: createSliceSetter('color')
  },
  selectors: {
    selectLayout: createSliceSelector('layout'),
    selectOrientation: createSliceSelector('orientation'),
    selectType: createSliceSelector('type'),
    selectColor: createSliceSelector('color')
  }
});

export const {
  setOrientation,
  setLayout,
  setColor,
  setType
} = layout.actions;

export const {
  selectOrientation,
  selectLayout,
  selectColor,
  selectType
} = layout.selectors;

export default layout.reducer;