import { propEq } from "ramda";
import { put, select, takeEvery } from "redux-saga/effects";
import { setLocationParams } from "@/modules/core/router/shared/lib";
import { selectStories, setStoryCode } from "@/modules/story/shared/lib";

function* worker({ payload }: ReturnType<typeof setLocationParams>) {
	if (!payload) {
		return;
	}

	const { storyCode } = payload;
	const stories: ReturnType<typeof selectStories> = yield select(selectStories);

	const story = stories.find(propEq(storyCode, "code"));
	const code = story?.code ?? null;

	yield put(setStoryCode(code));
}

export function* setStoryOnRouteChangeSaga() {
	yield takeEvery(setLocationParams.match, worker);
}
