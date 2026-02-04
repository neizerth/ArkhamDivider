import { put, select, takeEvery } from "redux-saga/effects";
import { addManyDividers, setDividers } from "@/modules/divider/shared/lib";
import { selectStories } from "@/modules/story/shared/lib";
import { generateInvestigatorDividers } from "./generateInvestigatorDividers";
import { getInvestigatorDividers } from "./lib";

function* worker({ payload }: ReturnType<typeof generateInvestigatorDividers>) {
	const { mode } = payload;

	const stories: ReturnType<typeof selectStories> = yield select(selectStories);

	const selectedStories = stories.filter((story) =>
		payload.storyCodes.includes(story.code),
	);

	const dividers = getInvestigatorDividers(selectedStories);

	if (mode === "add") {
		yield put(addManyDividers(dividers));
		return;
	}

	yield put(setDividers(dividers));
}

export function* generateInvestigatorDividersSaga() {
	yield takeEvery(generateInvestigatorDividers.match, worker);
}
