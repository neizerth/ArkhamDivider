import { IEncounterSet } from '@/types/api';
import { createSliceSelector, createSliceSetter } from '@/util/slice';
import { createSlice } from '@reduxjs/toolkit';

export type IEncounterSetsState = {
  list: IEncounterSet[]
}

const initialState: IEncounterSetsState = {
  list: []
};

export const encounterSets = createSlice({
  name: 'encounterSets',
  initialState,
  reducers: {
    setEncounterSets: createSliceSetter('list')
  },
  selectors: {
    selectEncounterSets: createSliceSelector('list')
  }
});

export const {
  setEncounterSets
} = encounterSets.actions;

export const {
  selectEncounterSets
} = encounterSets.selectors;

export default encounterSets.reducer;