import { LayoutType } from "@/types/layouts";
import { createSliceSelector, createSliceSetter } from '@/util/slice';
import { ActionCreator, createSlice } from '@reduxjs/toolkit';

import { layouts } from '@/data/layouts';
import { ILayout } from '@/types/layouts';
import * as reducers from './reducers';
import { safePropEq } from "@/util/criteria";
import { AppSelector, AppThunk } from "@/store";
import { getLayouts } from "@/features/layouts/common";
import { arkhamesqueCategory } from "@/data/layouts/arkhamesque";

export const DEFAULT_LAYOUT = layouts.find(safePropEq(true, 'isDefault')) as ILayout;

export type ILayoutState = {
  layout: ILayout,
  color: boolean,
  type: LayoutType,
  categoryId?: string,
  zoom: number,
}

const initialState: ILayoutState = {
  layout: DEFAULT_LAYOUT,
  color: true,
  type: LayoutType.SCENARIO,
  zoom: 100
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
    setZoom: createSliceSetter('zoom')
  },
  selectors: {
    selectLayout: createSliceSelector('layout'),
    selectType: createSliceSelector('type'),
    selectCategoryId: createSliceSelector('categoryId'),
    selectZoom: createSliceSelector('zoom')
  }
});


export const setLayoutById: ActionCreator<AppThunk> = (id: string) => (dispatch) => {
    const criteria = { id };
    const [layout] = getLayouts({ criteria });

    if (!layout) {
      return;
    }

    dispatch(setLayout(layout));
  }

export const selectIsArkhamesqueLayout: AppSelector<boolean> = (state) => {
  const { 
    layout, 
    categoryId: defaultCategoryId 
  } = state.layout;
  const categoryId = defaultCategoryId || layout.categoryId;

  return categoryId === arkhamesqueCategory.id;
}

export const {
  setLayout,
  setColor,
  setType,
  setCategoryId,
  setLayoutByCriteria,
  setZoom
} = layout.actions;

export const {
  selectLayout,
  selectType,
  selectCategoryId,
  selectZoom
} = layout.selectors;

export default layout.reducer;