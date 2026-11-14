import { put, select, takeEvery } from "redux-saga/effects";
import { sortScenarioDividers } from "@/modules/divider/entities/lib/logic";
import { selectDividers, setDividers } from "@/modules/divider/shared/lib";
import type { Divider } from "@/modules/divider/shared/model";
import { selectStoryWithRelations } from "@/modules/story/entities/lib";
import { generateScenarioDividers } from "./generateScenarioDividers";
import {
	getCampaignDividers,
	getEncounterSetDividers,
	getScenarioDividers,
} from "./lib";
import { selectCoreEncounters } from "./lib/selectors";

function* worker({ payload }: ReturnType<typeof generateScenarioDividers>) {
	const story: ReturnType<typeof selectStoryWithRelations> = yield select(
		selectStoryWithRelations,
	);

	if (!story) {
		return;
	}

	const coreEncounters: ReturnType<typeof selectCoreEncounters> =
		yield select(selectCoreEncounters);

	const campaignDividers = payload.campaignDivider
		? getCampaignDividers({
				story,
				includeReturnStory: payload.returnSet,
			})
		: [];

	const scenarioDividers = payload.scenarioDividers
		? getScenarioDividers({
				story,
				exceptEncounterCards: payload.scenarioEncounterDividers,
				includeReturnStory: payload.returnSet,
			})
		: [];

	const encounterSetDividers =
		payload.encounterDividers || payload.scenarioEncounterDividers
			? getEncounterSetDividers({
					story,
					coreEncounters,
					includeEncounterSets: payload.encounterDividers,
					includeReturnStory: payload.returnSet,
					includeScenarioEncounterSets: payload.scenarioEncounterDividers,
					includeExtraEncounterSets: payload.extraEncounterSets,
				})
			: [];

	const generated = [
		...campaignDividers,
		...scenarioDividers,
		...encounterSetDividers,
	];

	let existing: Divider[] = [];

	if (payload.mode === "add") {
		existing = yield select(selectDividers);
	}

	const dividers = sortScenarioDividers(
		[...existing, ...generated],
		payload.sortBy,
	);

	yield put(setDividers(dividers));
}

export function* generateScenarioDividersSaga() {
	yield takeEvery(generateScenarioDividers.match, worker);
}
