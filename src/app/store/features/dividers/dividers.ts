import { ActionCreator, createSlice } from '@reduxjs/toolkit';

import { createSliceSetter, createSliceSelector } from '@/shared/lib/features/util/slice';
import { IDividerList } from '@/shared/types/dividers';
import { AppSelector, AppThunk } from '@/app/store';
import { propEq } from 'ramda';
import { uniqId } from '@/shared/lib/features/util/common';
import { setType } from '../layout/layout';
import * as reducers from './reducers';
import { IStory } from '@/shared/types/api';

export type IDividersState = {
  list: IDividerList,
  story?: IStory
  loadQueue: string[]
  loadIndex: number
}

const initialState: IDividersState = {
  list: [],
  loadIndex: 0,
  loadQueue: []
};

export const dividers = createSlice({
  name: 'dividers',
  initialState,
  reducers: {
    ...reducers,
    setDividers: createSliceSetter('list'),
    setStory: createSliceSetter('story'),
    setLoadQueue: createSliceSetter('loadQueue')
  },
  selectors: {
    selectDividers: createSliceSelector('list'),
    selectStory: createSliceSelector('story'),
    selectLoadQueue: createSliceSelector('loadQueue'),
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
  const loadQueue = selectLoadQueue(state);
  
  dispatch(setLoadQueue(
    loadQueue.slice(1)
  ));
}

export const removeDivider: ActionCreator<AppThunk> = (id: string) =>
  (dispatch, getState) => {
    const state = getState();
    const data = selectDividers(state)
      .filter(divider => divider.id !== id);
    const loadQueue = selectLoadQueue(state);
    dispatch(setDividers(data));

    dispatch(setLoadQueue(
      loadQueue.filter(dividerId => dividerId !== id)
    ));
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

export const addLoadIndex: ActionCreator<AppThunk> = (id: string) =>
  (dispatch, getState) => {
    const state = getState();
    const loadQueue = selectLoadQueue(state);

    if (loadQueue.includes(id)) {
      return;
    }

    dispatch(setLoadQueue([
     ...loadQueue,
     id
    ]));
  }

export const selectLoadIndex: AppSelector = ({ dividers }) => dividers.loadQueue[0];  

export const {
  setDividers,
  removeAllDividers,
  setStory,
  setLoadQueue
} = dividers.actions;

export const {
  selectDividers,
  selectStory,
  selectLoadQueue
} = dividers.selectors;

export default dividers.reducer;