import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type IEncounterSetsState = {

}

const initialState: IEncounterSetsState = {

};

export const encounterSets = createSlice({
  name: 'encounterSets',
  initialState,
  reducers: {
  },
  selectors: {

  }
});

export const {

} = encounterSets.actions;

export const {

} = encounterSets.selectors;

export default encounterSets.reducer;