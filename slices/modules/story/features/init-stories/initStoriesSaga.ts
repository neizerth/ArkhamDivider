import { put, takeEvery } from "redux-saga/effects";
import { appDataLoaded } from "@/modules/core/app/shared/lib";
import { setStories } from "../../shared/lib";

function* worker({ payload }: ReturnType<typeof appDataLoaded>) {
	const { stories } = payload;

	yield put(setStories(stories));
}

export function* initStoriesSaga() {
	yield takeEvery(appDataLoaded.match, worker);
}
