import { propEq } from "ramda";
import { put, select, takeEvery } from "redux-saga/effects";
import { selectLayout } from "@/modules/divider/entities/lib";
import {
	selectDividers,
	setDividers,
	setLayoutId,
} from "@/modules/divider/shared/lib";
import { selectStories } from "@/modules/story/shared/lib";

function* worker() {
	const layout: ReturnType<typeof selectLayout> = yield select(selectLayout);
	const stories: ReturnType<typeof selectStories> = yield select(selectStories);

	if (!layout) {
		return;
	}

	const allDividers: ReturnType<typeof selectDividers> =
		yield select(selectDividers);

	const dividers = allDividers.filter((divider) => {
		const { storyCode } = divider;
		const story = stories.find(propEq(storyCode, "code"));

		if (story?.supported === false) {
			return false;
		}
		return layout.types.includes(divider.layoutType);
	});

	if (dividers.length === allDividers.length) {
		return;
	}

	yield put(setDividers(dividers));
}

export function* removeUnsupportedLayoutDividersSaga() {
	yield takeEvery(setLayoutId.match, worker);
}
