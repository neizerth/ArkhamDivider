import { put, select, takeEvery } from "redux-saga/effects";
import { appDataLoaded, appStarted } from "@/modules/core/app/shared/lib";
import { arkhamesqueClassicCategoryId } from "@/modules/divider/entities/items/arkhamesque-classic/config";
import {
	isArkhamesqueClassicStorySupported,
	selectArkhamesqueClassicData,
	setArkhamesqueClassicData,
} from "@/modules/divider/entities/items/arkhamesque-classic/lib";
import {
	selectCategoryId,
	selectDividerType,
	setCategoryId,
} from "@/modules/divider/shared/lib";
import { selectStories, setStories } from "@/modules/story/shared/lib";

function* worker() {
	const stories: ReturnType<typeof selectStories> = yield select(selectStories);
	const data: ReturnType<typeof selectArkhamesqueClassicData> = yield select(
		selectArkhamesqueClassicData,
	);

	if (!data || stories.length === 0) {
		return;
	}

	const categoryId: ReturnType<typeof selectCategoryId> =
		yield select(selectCategoryId);

	const dividerType: ReturnType<typeof selectDividerType> =
		yield select(selectDividerType);

	if (categoryId !== arkhamesqueClassicCategoryId) {
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
		const supported = isArkhamesqueClassicStorySupported({
			story,
			data,
			dividerType,
		});

		return {
			...story,
			supported,
		};
	});

	console.log("updated stories");

	yield put(setStories(storiesData));
}

export function* setSupportedArkhamesqueStoriesSaga() {
	yield takeEvery(appDataLoaded.match, worker);
	yield takeEvery(appStarted.match, worker);
	yield takeEvery(setArkhamesqueClassicData.match, worker);
	yield takeEvery(setCategoryId.match, worker);
}
