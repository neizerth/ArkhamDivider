import { put, takeEvery } from "redux-saga/effects";
import { setLocationParams } from "@/modules/core/router/shared/lib";
import { isDividerType, setDividerType } from "../../shared/lib";

function* worker({ payload }: ReturnType<typeof setLocationParams>) {
	if (!payload) {
		return;
	}

	const { dividerType } = payload;
	if (!isDividerType(dividerType)) {
		return;
	}

	yield put(setDividerType(dividerType));
}

export function* setDividerTypeOnRouteChangeSaga() {
	yield takeEvery(setLocationParams.match, worker);
}
