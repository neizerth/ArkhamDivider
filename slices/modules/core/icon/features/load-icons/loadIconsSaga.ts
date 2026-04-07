import { put, takeEvery } from "redux-saga/effects";
import { appDataLoaded } from "@/modules/core/app/shared/lib";
import { setIcons } from "../../shared/lib";
import type { IconMapping } from "../../shared/model";

function* worker({ payload }: ReturnType<typeof appDataLoaded>) {
	const icons = Object.values(payload.icons).reduce((acc, item) => {
		acc[item.icon] = item;
		return acc;
	}, {} as IconMapping);

	yield put(setIcons(icons));
}

export function* loadIconsSaga() {
	yield takeEvery(appDataLoaded.match, worker);
}
