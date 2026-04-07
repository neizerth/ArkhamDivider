import { getContext, select, takeEvery } from "redux-saga/effects";
import {
	changeLanguage,
	selectAvailableLanguages,
} from "@/modules/core/i18n/shared/lib";
import { replaceLocationLanguage } from "@/modules/core/router/entities/lib";
import type { AppRouter } from "../../../router/app/config";
import { selectLocation } from "../../../router/shared/lib";

function* worker({ payload }: ReturnType<typeof changeLanguage>) {
	const router: AppRouter = yield getContext("router");
	const location: ReturnType<typeof selectLocation> =
		yield select(selectLocation);
	const codes: string[] = yield select(selectAvailableLanguages);

	if (!location) {
		router.navigate(`/${payload}`);
		return;
	}

	const next = replaceLocationLanguage(location, payload, codes);

	router.navigate(next);
}

export function* navigateOnLanguageChangeSaga() {
	yield takeEvery(changeLanguage.match, worker);
}
