import { put, takeEvery } from "redux-saga/effects";
import { appDataLoaded } from "@/modules/core/app/shared/lib";
import { setEncounterSets } from "../../shared/lib";

function* worker({ payload }: ReturnType<typeof appDataLoaded>) {
	const { encounterSets } = payload;
	yield put(setEncounterSets(encounterSets));
}

export function* setEncountersOnAppLoadedSaga() {
	yield takeEvery(appDataLoaded.match, worker);
}
