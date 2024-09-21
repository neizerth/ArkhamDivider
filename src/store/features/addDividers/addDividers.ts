import { AppThunk } from "@/store";
import { IStory } from "@/types/api";
import { IFaction, ICardType, ICost } from "@/types/game";
import { ActionCreator } from "@reduxjs/toolkit";
import { selectEncounterSets } from "../encounterSets/encounterSets";
import { selectReturnSetsOf } from "../stories/stories";
import { getStoryDividers } from "@/features/dividers/story/getStoryDividers";
import { addDividers } from "../dividers/dividers";
import { getPlayerDividers } from "@/features/dividers/player/getPlayerDividers";

export type AddPlayerDividersOptions = {
  factions: IFaction[]
  costs: ICost[]
  types: ICardType[]
  useUpgrading: boolean
}

export type AddStoryDividersOptions = {
  story: IStory,
  includeExtraSets: boolean
  includeReturnSets: boolean
  includeScenarios: boolean
  includeEncounterSize: boolean
  includeCampaignIcon: boolean
  includeScenarioEncounterSet: boolean
  includeScenarioSize: boolean
}

export const addPlayerDividers = (options: AddPlayerDividersOptions): ActionCreator<AppThunk> => dispatch => {
  // const { factions } = options;
  // const dividers: IDivider = factions.map()

  const dividers = getPlayerDividers(options);
  dispatch(addDividers(dividers));
}

export const addStoryDividers: ActionCreator<AppThunk> = (options: AddStoryDividersOptions) => (dispatch, getState) => {
  const state = getState();

  const encounterSets = selectEncounterSets(state);
  const { story, includeReturnSets } = options;
 
  const selectReturnSets = selectReturnSetsOf(story.code);
  const returnStories = includeReturnSets ? selectReturnSets(state) : [];

  const dividers = getStoryDividers({
    ...options,
    returnStories,
    encounterSets
  });

  dispatch(addDividers(dividers));
}