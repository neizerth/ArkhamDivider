import { put, select, takeEvery } from "redux-saga/effects";
import {
	addManyDividers,
	selectCategory,
	selectLayout,
	setDividers,
	setScenarioParams,
} from "@/modules/divider/shared/lib";
import { selectStoryWithRelations } from "@/modules/story/entities/lib";
import { generateScenarioDividers } from "./generateScenarioDividers";
import {
	getCampaignDividers,
	getEncounterSetDividers,
	getScenarioDividers,
} from "./lib";

function* worker({ payload }: ReturnType<typeof generateScenarioDividers>) {
	const story: ReturnType<typeof selectStoryWithRelations> = yield select(
		selectStoryWithRelations,
	);
	const layout: ReturnType<typeof selectLayout> = yield select(selectLayout);
	const category: ReturnType<typeof selectCategory> =
		yield select(selectCategory);

	if (!story || !layout || !category) {
		return;
	}

	yield put(setScenarioParams(payload));

	const campaignDividers = payload.campaignDivider
		? getCampaignDividers({
				story,
				layout,
				category,
				includeReturnStory: payload.returnSet,
			})
		: [];

	const scenarioDividers = payload.scenarioDividers
		? getScenarioDividers({
				story,
				layout,
				category,
				exceptEncounterCards: payload.scenarioEncounterDividers,
			})
		: [];

	const encounterSetDividers = payload.encounterDividers
		? getEncounterSetDividers({
				story,
				layout,
				category,
				includeReturnStory: payload.returnSet,
				includeScenarioEncounterSets: payload.scenarioEncounterDividers,
				includeExtraEncounterSets: payload.extraEncounterSets,
			})
		: [];

	const dividers = [
		...campaignDividers,
		...encounterSetDividers,
		...scenarioDividers,
	];

	const actionCreator = payload.mode === "add" ? addManyDividers : setDividers;

	yield put(actionCreator(dividers));
}

export function* generateScenarioDividersSaga() {
	yield takeEvery(generateScenarioDividers.match, worker);
}
