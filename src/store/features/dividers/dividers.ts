import { ActionCreator, createSlice } from '@reduxjs/toolkit';

import { createSliceSetter, createSliceSelector } from '@/util/slice';
import { IDividerList } from '@/types/dividers';
import { AppThunk } from '@/store';
import { propEq } from 'ramda';
import { uniqId } from '@/util/common';

export type IDividersState = {
  list: IDividerList
}

const initialState: IDividersState = {
  list: []
};

export const dividers = createSlice({
  name: 'dividers',
  initialState,
  reducers: {
    setDividers: createSliceSetter('list'),
  },
  selectors: {
    selectDividers: createSliceSelector('list')
  }
});

export type ICampaignToDividersOptions = {
  excludeSets?: string[],
  currentLanguage: string
}

export const addDividers: ActionCreator<AppThunk> = (dividers: IDividerList) => 
  (dispatch, getState) => {
    const data = selectDividers(getState());

    dispatch(setDividers([
      ...data,
      ...dividers
    ]));
  }

export const removeAllDividers: ActionCreator<AppThunk> = () => 
  dispatch => dispatch(setDividers([]));

export const removeDivider: ActionCreator<AppThunk> = (id: string) =>
  (dispatch, getState) => {
    const data = selectDividers(getState())
      .filter(divider => divider.id !== id);
    dispatch(setDividers(data)); 
  }

export const copyDivider: ActionCreator<AppThunk> = (id: string) =>
  (dispatch, getState) => {
    const data = selectDividers(getState());
    const index = data.findIndex(propEq(id, 'id'));
    if (index === -1) {
      return;
    }
    const divider = data[index];

    dispatch(setDividers([
      ...data.slice(0, index),
      {
        ...divider,
        id: uniqId()
      },
      ...data.slice(index)
    ])); 
  }

export const {
  setDividers,
} = dividers.actions;

export const {
  selectDividers,
} = dividers.selectors;

export default dividers.reducer;