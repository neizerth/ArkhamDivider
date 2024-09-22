import { AppThunk } from "@/store";
import { IInvestigator, IStory } from "@/types/api";
import { IFaction, ICardType, IXPCost } from "@/types/game";
import { ActionCreator } from "@reduxjs/toolkit";
import { selectEncounterSets } from "../encounterSets/encounterSets";
import { selectReturnSetsOf } from "../stories/stories";
import { getStoryDividers } from "@/features/dividers/story/getStoryDividers";
import { addDividers } from "../dividers/dividers";
import { getPlayerDividers } from "@/features/dividers/player/getPlayerDividers";
import { getInvestigatorDividers } from "@/features/dividers/investigator/getInvestigatorDividers";

export type AddPlayerDividersOptions = {
  factions: IFaction[]
  xpCosts: IXPCost[]
  types: ICardType[]
  useUpgrading: boolean
  includeBasicWeakness: boolean
  includeAllies: boolean
  useFactionId: boolean
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

export type AddInvestigatorDividers = {
  investigators: IInvestigator[]
}

export const addInvestigatorDividers = (options: AddInvestigatorDividers): ActionCreator<AppThunk> => dispatch => {
  const dividers = getInvestigatorDividers(options);
  return dispatch(addDividers(dividers));
}

export const addPlayerDividers = (options: AddPlayerDividersOptions): ActionCreator<AppThunk> => dispatch => {
  const dividers = getPlayerDividers(options);
  return dispatch(addDividers(dividers));
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