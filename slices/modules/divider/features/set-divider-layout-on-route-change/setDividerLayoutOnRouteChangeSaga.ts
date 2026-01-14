import { put, takeEvery } from "redux-saga/effects";
import {
	getLocationDividerType,
	getLocationLayoutId,
} from "@/modules/core/router/entities/lib";
import { locationChanged } from "@/modules/core/router/entities/lib/store/features/changeLocation";
import { getLayoutById } from "../../entities/lib";
import { setCategoryId, setDividerType, setLayoutId } from "../../shared/lib";

function* worker({ payload }: ReturnType<typeof locationChanged>) {
	const { location } = payload;
	if (!location) {
		return;
	}
	const layoutId = getLocationLayoutId(location);
	const dividerType = getLocationDividerType(location);

	if (!layoutId) {
		return;
	}
	const layout = getLayoutById(layoutId);

	if (!layout) {
		return;
	}
	yield put(setLayoutId(layoutId));
	yield put(setCategoryId(layout.categoryId));
	yield put(setDividerType(dividerType));
}

export function* setDividerLayoutOnRouteChangeSaga() {
	yield takeEvery(locationChanged.match, worker);
}
