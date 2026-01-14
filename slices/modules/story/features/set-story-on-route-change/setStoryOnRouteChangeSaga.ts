import { propEq } from "ramda";
import { put, select, takeEvery } from "redux-saga/effects";
import { getLocationStoryCode } from "@/modules/core/router/entities/lib";
import { locationChanged } from "@/modules/core/router/entities/lib/store/features/changeLocation";
import { selectStories, setStoryCode } from "@/modules/story/shared/lib";

function* worker({ payload }: ReturnType<typeof locationChanged>) {
	const { location } = payload;
	const storyCode = getLocationStoryCode(location);

	const stories: ReturnType<typeof selectStories> = yield select(selectStories);

	const story = stories.find(propEq(storyCode, "code"));
	const code = story?.code ?? null;

	yield put(setStoryCode(code));
}

export function* setStoryOnRouteChangeSaga() {
	yield takeEvery(locationChanged.match, worker);
}
