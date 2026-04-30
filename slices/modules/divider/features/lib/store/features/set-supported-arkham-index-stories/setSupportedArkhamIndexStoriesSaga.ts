import { put, select, takeEvery } from "redux-saga/effects";
import { appDataLoaded, appStarted } from "@/modules/core/app/shared/lib";
import { arkhamIndexCategoryId } from "@/modules/divider/entities/items/arkham-index/config";
import {
	selectArkhamIndexData,
	setArkhamIndexData,
} from "@/modules/divider/entities/items/arkham-index/lib/store";
import { selectCategoryId, setCategoryId } from "@/modules/divider/shared/lib";
import { selectStories, setStories } from "@/modules/story/shared/lib";

function* worker() {
	const stories: ReturnType<typeof selectStories> = yield select(selectStories);
	const data: ReturnType<typeof selectArkhamIndexData> = yield select(
		selectArkhamIndexData,
	);

	if (!data || stories.length === 0) {
		return;
	}

	const categoryId: ReturnType<typeof selectCategoryId> =
		yield select(selectCategoryId);

	if (categoryId !== arkhamIndexCategoryId) {
		const haveUnsupportedStories = stories.some((story) => !story.supported);

		if (!haveUnsupportedStories) {
			return;
		}

		const data = stories.map((story) => ({
			...story,
			supported: true,
		}));

		yield put(setStories(data));
		return;
	}

	const storiesData = stories.map((story) => {
		const code = story.return_to_code ?? story.code;
		const supported = data.supported_stories.includes(code);

		return {
			...story,
			supported,
		};
	});

	console.log("updated stories");

	yield put(setStories(storiesData));
}

export function* setSupportedArkhamIndexStoriesSaga() {
	yield takeEvery(appDataLoaded.match, worker);
	yield takeEvery(appStarted.match, worker);
	yield takeEvery(setArkhamIndexData.match, worker);
	yield takeEvery(setCategoryId.match, worker);
}
