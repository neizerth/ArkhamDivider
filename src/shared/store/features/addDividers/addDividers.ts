import { AppThunk } from "@/shared/store";
import { IInvestigator, IStory } from "@/shared/types/api";
import { IFaction, ICardType, IXPCost } from "@/shared/types/game";
import { ActionCreator } from "@reduxjs/toolkit";
import { selectEncounterSets } from "../encounterSets/encounterSets";
import { selectStories } from "../stories/stories";
import { getStoryDividers } from "@/shared/lib/features/dividers/story/getStoryDividers";
import { addDividers } from "../dividers/dividers";
import { getPlayerDividers } from "@/shared/lib/features/dividers/player/getPlayerDividers";
import { getInvestigatorDividers } from "@/shared/lib/features/dividers/investigator/getInvestigatorDividers";
import { withReturnTo } from "../stories/criteria";

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
