import { put, takeEvery } from "redux-saga/effects";
import { appDataLoaded } from "@/modules/core/app/shared/lib";
import { getStoryScenarios, setStories } from "../../shared/lib";

function* worker({ payload }: ReturnType<typeof appDataLoaded>) {
	const stories = payload.stories.map((story) => {
		const returnStory = payload.stories.find(
			({ return_to_code }) => return_to_code === story.code,
		);

		const returnScenarios = returnStory && getStoryScenarios(returnStory);

		return {
			...story,
			translated: true,
			return_code: returnStory?.code,
			return_scenarios: returnScenarios,
			return_encounter_sets: returnStory?.encounter_sets,
			return_scenario_encounter_sets: returnStory?.scenario_encounter_sets,
		};
	});

	yield put(setStories(stories));
}

export function* initStoriesSaga() {
	yield takeEvery(appDataLoaded.match, worker);
}
