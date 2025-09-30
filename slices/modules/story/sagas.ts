import { fork } from "redux-saga/effects";
import { storyFeaturesSaga } from "./features/sagas";

export function* storySaga() {
	yield fork(storyFeaturesSaga);
}
