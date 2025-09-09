import { call, put, takeEvery } from "redux-saga/effects";
import { ArkhamDividerAPI } from "@/shared/api/ArkhamDividerAPI";
import type { ReturnAwaited } from "@/shared/model";
import { appDataLoaded, appStarted, setAppLoaded } from "../../shared/lib";

const { getCoreData } = ArkhamDividerAPI;

function* worker() {
	const data: ReturnAwaited<typeof getCoreData> = yield call(getCoreData);
	yield put(appDataLoaded(data));

	yield put(setAppLoaded(true));
}

export function* loadCoreDataSaga() {
	yield takeEvery(appStarted.match, worker);
}
