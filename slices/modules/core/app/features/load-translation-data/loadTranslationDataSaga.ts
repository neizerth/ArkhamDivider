import { call, put, takeEvery } from "redux-saga/effects";
import { setLanguage } from "@/modules/core/i18n/shared/lib";
import { ArkhamDividerAPI } from "@/shared/api/ArkhamDividerAPI";
import type { ReturnAwaited } from "@/shared/model";
import { appTranslationsLoaded } from "../../shared/lib";

const { getTranslations } = ArkhamDividerAPI;
function* worker(action: ReturnType<typeof setLanguage>) {
	const language = action.payload;

	const data: ReturnAwaited<typeof getTranslations> = yield call(
		getTranslations,
		language,
	);

	yield put(appTranslationsLoaded(data));
}

export function* loadTranslationDataSaga() {
	yield takeEvery(setLanguage.match, worker);
}
