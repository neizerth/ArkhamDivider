
import { createSliceSelector, createSliceSetter } from '@/util/slice';
import { createSlice } from '@reduxjs/toolkit';
import { IStory } from '@/types/api';
import { AppSelector } from '@/store';
import { ascend, descend, prop, sortWith } from 'ramda';
import { isCampaign, isReturnPack } from './criteria';

export type IStoriesState = {
  list: IStory[]
}

const initialState: IStoriesState = {
  list: []
};

export const stories = createSlice({
  name: 'stories',
  initialState,
  reducers: {
    setStories: createSliceSetter('list'),
  },
  selectors: {
    selectStories: createSliceSelector('list'),
  }
});

export const {
  setStories
} = stories.actions;

export const {
  selectStories,
} = stories.selectors;

export default stories.reducer;