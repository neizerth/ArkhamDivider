import { put, select, takeEvery } from "redux-saga/effects";
import { getLocationLanguage } from "@/modules/core/router/entities/lib";
import { locationChanged } from "@/modules/core/router/entities/lib/store/features/changeLocation";
import { selectLanguage, setLanguage } from "../../shared/lib";

function* worker({ payload }: ReturnType<typeof locationChanged>) {
	const { location } = payload;

	const currentLanguage: ReturnType<typeof selectLanguage> =
		yield select(selectLanguage);

	const language = getLocationLanguage(location);

	if (currentLanguage === language || !language) {
		return;
	}

	yield put(setLanguage(language));
}

export function* setLanguageOnRouteChangeSaga() {
	yield takeEvery(locationChanged.match, worker);
}
