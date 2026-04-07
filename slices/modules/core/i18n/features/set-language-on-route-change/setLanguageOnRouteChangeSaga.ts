import { put, select, takeEvery } from "redux-saga/effects";
import { setLocationParams } from "@/modules/core/router/shared/lib";
import { changeLanguageBundle } from "../../entities/lib/store/features/changeLanguageBundle";
import { selectCurrentLanguage, setLanguage } from "../../shared/lib";

function* worker({ payload }: ReturnType<typeof setLocationParams>) {
	if (!payload) {
		return;
	}

	const { language } = payload;

	const currentLanguage: ReturnType<typeof selectCurrentLanguage> =
		yield select(selectCurrentLanguage);

	if (currentLanguage === language || !language) {
		return;
	}

	yield put(setLanguage(language));

	yield put(changeLanguageBundle(language));
}

export function* setLanguageOnRouteChangeSaga() {
	yield takeEvery(setLocationParams.match, worker);
}
