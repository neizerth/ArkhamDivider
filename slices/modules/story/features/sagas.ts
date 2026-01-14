import { fork } from "redux-saga/effects";
import { initStoriesSaga } from "./init-stories/initStoriesSaga";
import { navigateOnStoryChangeSaga } from "./navigate-on-story-change/navigateOnStoryChangeSaga";
import { setStoryOnRouteChangeSaga } from "./set-story-on-route-change/setStoryOnRouteChangeSaga";

export function* storyFeaturesSaga() {
	yield fork(initStoriesSaga);
	yield fork(navigateOnStoryChangeSaga);
	yield fork(setStoryOnRouteChangeSaga);
}
