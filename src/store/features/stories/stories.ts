
import { createSliceSelector, createSliceSetter } from '@/util/slice';
import { createSlice } from '@reduxjs/toolkit';
import { IStory } from '@/types/api';
import { AppSelector } from '@/store';
import { withReturnTo } from './criteria';

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

export const selectReturnSetsOf = (code: string): AppSelector<IStory[]> => 
  state => selectStories(state)
    .filter(withReturnTo(code))

export default stories.reducer;