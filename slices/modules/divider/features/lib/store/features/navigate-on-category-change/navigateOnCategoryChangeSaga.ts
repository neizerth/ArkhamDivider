import { descend, propEq, sortWith } from "ramda";
import { getContext, put, select, takeEvery } from "redux-saga/effects";
import { selectCurrentLanguage } from "@/modules/core/i18n/shared/lib";
import type { AppRouter } from "@/modules/core/router/app/config";
import { layoutRoute } from "@/modules/core/router/entities/lib";
import { getCategoryById, selectLayout } from "@/modules/divider/entities/lib";
import {
	categoryIdChanged,
	changeCategoryId,
	selectDividerType,
} from "@/modules/divider/shared/lib";
import { selectStoryCode } from "@/modules/story/shared/lib";

function* worker({ payload }: ReturnType<typeof changeCategoryId>) {
	const currentLayout: ReturnType<typeof selectLayout> =
		yield select(selectLayout);

	if (!payload || !currentLayout) {
		return;
	}

	const category = getCategoryById(payload);

	if (!category) {
		return;
	}

	const language: ReturnType<typeof selectCurrentLanguage> = yield select(
		selectCurrentLanguage,
	);

	const dividerType: ReturnType<typeof selectDividerType> =
		yield select(selectDividerType);

	const storyCode: ReturnType<typeof selectStoryCode> =
		yield select(selectStoryCode);

	const orientation = currentLayout.orientation;
	const color = currentLayout.color;

	const [first] = sortWith(
		[
			descend(propEq(color, "color")),
			descend(propEq(orientation, "orientation")),
			descend(({ types }) => types.includes(dividerType)),
		],
		category.layouts,
	);

	const router: AppRouter = yield getContext("router");

	router.navigate(
		layoutRoute({
			layoutId: first.id,
			dividerType: first.types[0],
			language,
			storyCode,
		}),
	);

	yield put(
		categoryIdChanged({
			prevCategoryId: currentLayout.categoryId,
			newCategoryId: payload,
		}),
	);
}

export function* navigateOnCategoryChangeSaga() {
	yield takeEvery(changeCategoryId.match, worker);
}
