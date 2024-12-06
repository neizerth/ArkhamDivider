import { ActionCreator, createSlice } from '@reduxjs/toolkit';

import { createSliceSetter, createSliceSelector } from '@/util/slice';
import { IDividerList } from '@/types/dividers';
import { AppThunk } from '@/store';
import { propEq } from 'ramda';
import { uniqId } from '@/util/common';
import { setType } from '../layout/layout';
import * as reducers from './reducers';
import { IStory } from '@/types/api';

export type IDividersState = {
  list: IDividerList,
  story?: IStory
  loadIndex: number
}

const initialState: IDividersState = {
  list: [],
  loadIndex: 0,
};

export const dividers = createSlice({
  name: 'dividers',
  initialState,
  reducers: {
    ...reducers,
    setDividers: createSliceSetter('list'),
    setStory: createSliceSetter('story'),
    setLoadIndex: createSliceSetter('loadIndex')
  },
  selectors: {
    selectDividers: createSliceSelector('list'),
    selectStory: createSliceSelector('story'),
    selectLoadIndex: createSliceSelector('loadIndex'),
  },
  extraReducers(builder) {
    builder.addCase(setType, (state) => {
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

export const setNextLoadIndex: ActionCreator<AppThunk> = () => (dispatch, getState) => {
  const state = getState();
  const index = selectLoadIndex(state);
  dispatch(setLoadIndex(index + 1));
}

export const removeDivider: ActionCreator<AppThunk> = (id: string) =>
  (dispatch, getState) => {
    const state = getState();
    const data = selectDividers(state)
      .filter(divider => divider.id !== id);
    const loadIndex = selectLoadIndex(state);
    dispatch(setDividers(data));
    dispatch(setLoadIndex(loadIndex - 1));
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
    dispatch(setNextLoadIndex());
  }

export const {
  setDividers,
  removeAllDividers,
  setStory,
  setLoadIndex
} = dividers.actions;

export const {
  selectDividers,
  selectStory,
  selectLoadIndex
} = dividers.selectors;

export default dividers.reducer;