import { getContext, select, takeEvery } from "redux-saga/effects";
import { selectLanguage } from "@/modules/core/i18n/shared/lib";
import type { AppRouter } from "@/modules/core/router/app/config";
import { layoutRoute } from "@/modules/core/router/entities/lib";
import {
	selectDividerType,
	selectLayoutId,
} from "@/modules/divider/shared/lib";
import { changeStoryCode } from "../../shared/lib/store";

function* worker({ payload }: ReturnType<typeof changeStoryCode>) {
	const router: AppRouter = yield getContext("router");

	const layoutId: ReturnType<typeof selectLayoutId> =
		yield select(selectLayoutId);

	const language: ReturnType<typeof selectLanguage> =
		yield select(selectLanguage);

	const dividerType: ReturnType<typeof selectDividerType> =
		yield select(selectDividerType);

	if (!layoutId || !language) {
		return;
	}

	router.navigate(
		layoutRoute({
			layoutId,
			dividerType,
			language,
			storyCode: payload,
		}),
	);
}

export function* navigateOnStoryChangeSaga() {
	yield takeEvery(changeStoryCode.match, worker);
}
