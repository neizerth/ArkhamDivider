import { put, select, take, takeEvery } from "redux-saga/effects";
import { setTranslatedStories } from "@/modules/core/i18n/shared/lib";
import { selectStories, setStories } from "../../shared/lib";

function* worker({ payload }: ReturnType<typeof setTranslatedStories>) {
	const stories: ReturnType<typeof selectStories> = yield select(selectStories);

	if (stories.length === 0) {
		// Wait for stories to be set
		yield take(setStories.match);
	}

	if (payload.length === 0) {
		return;
	}

	const newStories = stories.map((story) => {
		const translated = payload.includes(story.code);
		return {
			...story,
			translated,
		};
	});

	yield put(setStories(newStories));
}

export function* updateStoriesTranslationSaga() {
	yield takeEvery(setTranslatedStories.match, worker);
}
