import { put, takeEvery } from "redux-saga/effects";
import { setLocationParams } from "@/modules/core/router/shared/lib";
import { getLayoutById } from "../../entities/lib";
import {
	isDividerType,
	setCategoryId,
	setDividerType,
	setLayoutId,
} from "../../shared/lib";

function* worker({ payload }: ReturnType<typeof setLocationParams>) {
	if (!payload) {
		return;
	}

	const { layoutId, dividerType } = payload;

	if (!layoutId) {
		return;
	}

	const layout = getLayoutById(layoutId);

	if (!layout) {
		return;
	}
	yield put(setLayoutId(layoutId));
	yield put(setCategoryId(layout.categoryId));

	if (!isDividerType(dividerType)) {
		return;
	}

	yield put(setDividerType(dividerType));
}

export function* setDividerLayoutOnRouteChangeSaga() {
	yield takeEvery(setLocationParams.match, worker);
}
