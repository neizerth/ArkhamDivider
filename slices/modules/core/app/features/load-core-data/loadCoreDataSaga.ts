import { put, retry, select, takeEvery } from "redux-saga/effects";
import { ArkhamDividerAPI } from "@/shared/api";
import type { ReturnAwaited } from "@/shared/model";
import { seconds } from "@/shared/util";
import {
	appDataLoaded,
	appStarted,
	selectAppDataLoaded,
	setAppLoaded,
} from "../../shared/lib";

const { getCoreData } = ArkhamDividerAPI;

function* worker() {
	const dataLoaded: ReturnType<typeof selectAppDataLoaded> =
		yield select(selectAppDataLoaded);
	if (dataLoaded) {
		yield put(setAppLoaded(true));
	}

	const data: ReturnAwaited<typeof getCoreData> = yield retry(
		3,
		seconds(1),
		getCoreData,
	);
	yield put(appDataLoaded(data));

	if (!dataLoaded) {
		yield put(setAppLoaded(true));
	}
}

export function* loadCoreDataSaga() {
	yield takeEvery(appStarted.match, worker);
}
