import { getContext, select, takeEvery } from "redux-saga/effects";
import { selectCurrentLanguage } from "@/modules/core/i18n/shared/lib";
import type { AppRouter } from "@/modules/core/router/app/config";
import { layoutRoute } from "@/modules/core/router/entities/lib";
import {
	changeLayoutId,
	selectDividerType,
} from "@/modules/divider/shared/lib";
import { selectStoryCode } from "../../shared/lib";

function* worker({ payload }: ReturnType<typeof changeLayoutId>) {
	const router: AppRouter = yield getContext("router");

	const language: ReturnType<typeof selectCurrentLanguage> = yield select(
		selectCurrentLanguage,
	);

	const dividerType: ReturnType<typeof selectDividerType> =
		yield select(selectDividerType);

	const storyCode: ReturnType<typeof selectStoryCode> =
		yield select(selectStoryCode);

	if (!language) {
		return;
	}

	router.navigate(
		layoutRoute({
			layoutId: payload,
			dividerType,
			language,
			storyCode,
		}),
	);
}

export function* navigateOnLayoutChangeSaga() {
	yield takeEvery(changeLayoutId.match, worker);
}
