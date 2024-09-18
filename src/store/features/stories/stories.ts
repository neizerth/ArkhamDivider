
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
    selectStoriesList: createSliceSelector('list'),
  }
});


export const {
  setStories
} = stories.actions;

export const {
  selectStoriesList,
} = stories.selectors;

export const selectStories: AppSelector<IStory[]> = state => {
  const data = selectStoriesList(state);

  return sortWith([
    descend(({ is_official }) => Boolean(is_official)),
    descend(isCampaign),
    ascend(isReturnPack),
    ascend(({ position }) => position || Infinity),
    ascend(prop('name'))
  ], data)
}

export default stories.reducer;