import { fork } from "redux-saga/effects";
import { initStoriesSaga } from "./init-stories/initStoriesSaga";

export function* storyFeaturesSaga() {
	yield fork(initStoriesSaga);
}
