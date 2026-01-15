import { getContext, select, takeEvery } from "redux-saga/effects";
import { selectLanguage } from "@/modules/core/i18n/shared/lib";
import type { AppRouter } from "@/modules/core/router/app/config";
import { layoutRoute } from "@/modules/core/router/entities/lib";
import { selectLayoutId } from "../../shared/lib";
import { changeDividerType } from "../../shared/model";

function* worker({ payload }: ReturnType<typeof changeDividerType>) {
	const router: AppRouter = yield getContext("router");
	const layoutId: ReturnType<typeof selectLayoutId> =
		yield select(selectLayoutId);
	const language: ReturnType<typeof selectLanguage> =
		yield select(selectLanguage);

	if (!layoutId || !language) {
		return;
	}

	router.navigate(
		layoutRoute({
			language,
			layoutId,
			dividerType: payload,
		}),
	);
}

export function* navigateOnDividerTypeChangeSaga() {
	yield takeEvery(changeDividerType.match, worker);
}
