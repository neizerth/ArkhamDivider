import { put, takeEvery } from "redux-saga/effects";
import { appDataLoaded } from "@/modules/core/app/shared/lib";
import { setAvailableLanguages } from "../../shared/store";

function* worker({ payload }: ReturnType<typeof appDataLoaded>) {
	const { languages } = payload;

	yield put(setAvailableLanguages(languages));
}

export function* initI18nSaga() {
	yield takeEvery(appDataLoaded.match, worker);
}
