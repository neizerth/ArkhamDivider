import { ActionCreator, createSlice } from '@reduxjs/toolkit';

import { createSliceSetter, createSliceSelector } from '@/util/slice';
import { IDividerList } from '@/types/dividers';
import { AppThunk } from '@/store';
import { propEq } from 'ramda';
import { uniqId } from '@/util/common';
import { setType, setLayout } from '../layout/layout';
import * as reducers from './reducers';
import { IStory } from '@/types/api';

export type IDividersState = {
  list: IDividerList,
  story?: IStory
}

const initialState: IDividersState = {
  list: [],
};

export const dividers = createSlice({
  name: 'dividers',
  initialState,
  reducers: {
    ...reducers,
    setDividers: createSliceSetter('list'),
    setStory: createSliceSetter('story')
  },
  selectors: {
    selectDividers: createSliceSelector('list'),
    selectStory: createSliceSelector('story')
  },
  extraReducers(builder) {
    builder.addCase(setType, (state) => {
        dividers.caseReducers.removeAllDividers(state);
      })
      .addCase(setLayout, (state) => {
        dividers.caseReducers.removeAllDividers(state);
      });
  },
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
  removeAllDividers,
  setStory
} = dividers.actions;

export const {
  selectDividers,
  selectStory
} = dividers.selectors;

export default dividers.reducer;