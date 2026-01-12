import { getContext, select, takeEvery } from "redux-saga/effects";
import { changeLanguage } from "@/modules/core/i18n/shared/lib";
import type { AppRouter } from "../../../router/app/config";
import { selectLocation } from "../../../router/shared/lib";

function* worker({ payload }: ReturnType<typeof changeLanguage>) {
	const router: AppRouter = yield getContext("router");
	const location: ReturnType<typeof selectLocation> =
		yield select(selectLocation);

	if (!location) {
		router.navigate(`/${payload}`);
		return;
	}

	const pathname = location.pathname.replace(/^\/[\w-]+/, `/${payload}`);

	router.navigate(pathname);
}

export function* navigateOnLanguageChangeSaga() {
	yield takeEvery(changeLanguage.match, worker);
}
