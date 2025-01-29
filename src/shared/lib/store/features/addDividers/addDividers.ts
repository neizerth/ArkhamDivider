import { getInvestigatorDividers } from "@/shared/lib/features/dividers/investigator/getInvestigatorDividers";
import { getPlayerDividers } from "@/shared/lib/features/dividers/player/getPlayerDividers";
import { getStoryDividers } from "@/shared/lib/features/dividers/story/getStoryDividers";
import type { AppThunk } from "@/shared/lib/store";
import type { IInvestigator, IStory } from "@/shared/model/types/api";
import type { ICardType, IFaction, IXPCost } from "@/shared/model/types/game";
import type { ActionCreator } from "@reduxjs/toolkit";
import { addDividers } from "../dividers/dividers";
import { selectEncounterSets } from "../encounterSets/encounterSets";
import { withReturnTo } from "../stories/criteria";
import { selectStories } from "../stories/stories";

export type AddPlayerDividersOptions = {
	story?: IStory;
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

export type AddInvestigatorDividers = {
	investigators: IInvestigator[];
};

export const addInvestigatorDividers =
	(options: AddInvestigatorDividers): ActionCreator<AppThunk> =>
	(dispatch) => {
		const dividers = getInvestigatorDividers(options);
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

		const returnStories = includeReturnSets
			? stories.filter(withReturnTo(story.code))
			: [];

		const dividers = getStoryDividers({
			...options,
			returnStories,
			encounterSets,
		});

		dispatch(addDividers(dividers));
	};
