import { TabPosition } from '@/components/dividers/vintage/VintageDivider/features/tabPosition';
import { createSliceSelector, createSliceSetter } from '@/util/slice';
import { ActionCreator, createSlice } from '@reduxjs/toolkit';
import { setDividers } from '../dividers/dividers';
import { fromPairs, prop } from 'ramda';
import { AppThunk } from '@/store';

export type IVintageState = {
  tabPositions: Record<string, TabPosition>
}

const initialState: IVintageState = {
  tabPositions: {}
};

export const vintage = createSlice({
  name: 'vintage',
  initialState,
  reducers: {
    setTabPositions: createSliceSetter('tabPositions')
  },
  selectors: {
    selectTabPositions: createSliceSelector('tabPositions')
  },
  extraReducers: (builder) => {
    builder.addCase(setDividers, (state, action) => {
      const dividers = action.payload;

      const ids = dividers.map(prop('id'));

      const pairs = Object.entries(state.tabPositions)
        .filter(([id]) => ids.includes(id));
      
      state.tabPositions = fromPairs(pairs);
    })
  }
});

export const moveTab: ActionCreator<AppThunk> = (id: string, position: TabPosition) => (dispatch, getState) => {
  const positions = selectTabPositions(getState());

  dispatch(setTabPositions({
    ...positions,
    [id]: position
  }));
}

export const {
  setTabPositions
} = vintage.actions;

export const {
  selectTabPositions
} = vintage.selectors;

export default vintage.reducer;