import { put, select, takeEvery } from "redux-saga/effects";
import { selectCurrentLanguage } from "@/modules/core/i18n/shared/lib";
import { setCurrentLayoutParam } from "@/modules/divider/shared/lib";
import { setLayoutFontFamily } from "./setLayoutFontFamily";

function* worker({ payload }: ReturnType<typeof setLayoutFontFamily>) {
	const locale: ReturnType<typeof selectCurrentLanguage> = yield select(
		selectCurrentLanguage,
	);

	yield put(
		setCurrentLayoutParam({
			locale,
			key: "fontFamily",
			value: payload,
		}),
	);
}

export function* setLayoutFontFamilySaga() {
	yield takeEvery(setLayoutFontFamily.match, worker);
}
