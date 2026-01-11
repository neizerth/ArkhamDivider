import { ActionCreator } from '@reduxjs/toolkit';
import { getInvestigatorDividers } from '@/shared/lib/features/dividers/investigator/getInvestigatorDividers';
import { getPlayerDividers } from '@/shared/lib/features/dividers/player/getPlayerDividers';
import { getStoryDividers } from '@/shared/lib/features/dividers/story/getStoryDividers';
import { AppThunk } from '@/shared/store';
import { IInvestigator, IStory } from '@/shared/types/api';
import { ICardType, IFaction, IXPCost } from '@/shared/types/game';
import { Nullable } from '@/shared/types/util';
import { addDividers } from '../dividers/dividers';
import { selectEncounterSets } from '../encounterSets/encounterSets';
import { selectLayout } from '../layout/layout';
import { withReturnTo } from '../stories/criteria';
import { selectStories } from '../stories/stories';

export type AddPlayerDividersOptions = {
  story: Nullable<IStory>;
  factions: IFaction[];
  xpCosts: IXPCost[];
  types: ICardType[];
  includeUpgrading: boolean;
  includeCustomizations: boolean;
  includeBasicWeakness: boolean;
  includeAllies: boolean;
  includeFactionId: boolean;
  includeInvestigators: boolean;
  includeBonded: boolean;
  displaySideXP: boolean;
  displayNumericXP: boolean;
  storySupported?: boolean;
};

export type AddStoryDividersOptions = {
  story: IStory;
  includeExtraSets: boolean;
  includeReturnSets: boolean;
  includeScenarios: boolean;
  includeEncounterSize: boolean;
  includeCampaignIcon: boolean;
  includeScenarioEncounterSet: boolean;
  includeScenarioSize: boolean;
  includeCampaign: boolean;
  includeEncounters: boolean;
};

export type AddInvestigatorDividersOptions = {
  doubleSided: boolean;
  duplicateCodes: Record<string, number>;
  includeStoryIcon: boolean;
};

export type AddInvestigatorDividers = Partial<AddInvestigatorDividersOptions> & {
  investigators: IInvestigator[];
};

export const addInvestigatorDividers =
  (options: AddInvestigatorDividers & { story: IStory }): ActionCreator<AppThunk> =>
  (dispatch, getState) => {
    const state = getState();
    const layout = selectLayout(state);
    const dividers = getInvestigatorDividers({
      ...options,
      doubleSided: layout.investigatorOptions?.doubleSided || options.doubleSided,
      duplicateCodes: layout.investigatorOptions?.duplicateCodes || options.duplicateCodes,
      includeStoryIcon: layout.investigatorOptions?.includeStoryIcon || options.includeStoryIcon,
    });
    return dispatch(addDividers(dividers));
  };

export const addPlayerDividers =
  (options: AddPlayerDividersOptions): ActionCreator<AppThunk> =>
  (dispatch) => {
    const dividers = getPlayerDividers(options);
    return dispatch(addDividers(dividers));
  };

export const addStoryDividers: ActionCreator<AppThunk> =
  (options: AddStoryDividersOptions) => (dispatch, getState) => {
    const state = getState();
    const encounterSets = selectEncounterSets(state);
    const stories = selectStories(state);
    const { story, includeReturnSets } = options;

    const returnStories = includeReturnSets ? stories.filter(withReturnTo(story.code)) : [];

    const dividers = getStoryDividers({
      ...options,
      returnStories,
      encounterSets,
    });

    dispatch(addDividers(dividers));
  };
