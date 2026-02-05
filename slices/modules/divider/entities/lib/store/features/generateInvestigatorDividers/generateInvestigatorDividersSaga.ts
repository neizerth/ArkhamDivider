import { put, select, takeEvery } from "redux-saga/effects";
import { addManyDividers, setDividers } from "@/modules/divider/shared/lib";
import { selectStories } from "@/modules/story/shared/lib";
import { selectLayout } from "../../selectors";
import { generateInvestigatorDividers } from "./generateInvestigatorDividers";
import { getInvestigatorDividers } from "./lib";

function* worker({ payload }: ReturnType<typeof generateInvestigatorDividers>) {
	const { mode } = payload;

	const layout: ReturnType<typeof selectLayout> = yield select(selectLayout);

	if (!layout) {
		return;
	}

	const stories: ReturnType<typeof selectStories> = yield select(selectStories);

	const selectedStories = stories.filter((story) =>
		payload.storyCodes.includes(story.code),
	);

	const dividers = getInvestigatorDividers({
		stories: selectedStories,
		layout,
	});

	console.log({
		dividers,
		mode,
	});

	if (mode === "create") {
		yield put(setDividers(dividers));
	} else if (mode === "add") {
		yield put(addManyDividers(dividers));
	}
}

export function* generateInvestigatorDividersSaga() {
	yield takeEvery(generateInvestigatorDividers.match, worker);
}
