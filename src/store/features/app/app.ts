import { fetchCoreData } from '@/api/dividerDivider';
import { AppThunk } from '@/store';
import { createSliceSelector, createSliceSetter } from '@/util/slice';
import { ActionCreator, createSlice } from '@reduxjs/toolkit';
import { setCampaigns } from '../campaigns/campaigns';
import { setIconSet } from '../icons/icons';
import { transformProjectToIconSet } from '../icons/transform/icomoon';
import { setAvailableLanguages } from '../language/language';
import { setEncounterSets } from '../encounterSets/encounterSets';

export type IAppState = {
  loading: boolean
}

const initialState: IAppState = {
  loading: true
};

export const app = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLoading: createSliceSetter('loading')
  },
  selectors: {
    selectLoading: createSliceSelector('loading')
  }
});

export const loadAppData: ActionCreator<AppThunk> = () => async dispatch => {
  dispatch(setLoading(true));
  const {
    campaigns,
    icons,
    encounterSets,
    languages
  } = await fetchCoreData();

  const iconSet = { icons };

  dispatch(setCampaigns(campaigns));
  dispatch(setEncounterSets(encounterSets));
  dispatch(setIconSet(iconSet));
  dispatch(setAvailableLanguages(languages))
  // console.log(data);
  dispatch(setLoading(false));
}

export const {
  setLoading
} = app.actions;

export const {
  selectLoading
} = app.selectors;

export default app.reducer;