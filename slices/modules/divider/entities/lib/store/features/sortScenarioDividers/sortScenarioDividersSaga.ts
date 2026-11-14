import { put, select, takeEvery } from "redux-saga/effects";
import { sortScenarioDividers as applySort } from "@/modules/divider/entities/lib/logic";
import { selectDividers, setDividers } from "@/modules/divider/shared/lib";
import type { Divider } from "@/modules/divider/shared/model";
import { sortScenarioDividers } from "./sortScenarioDividers";

function* worker({ payload }: ReturnType<typeof sortScenarioDividers>) {
	const dividers: Divider[] = yield select(selectDividers);

	if (dividers.length === 0) {
		return;
	}

	yield put(setDividers(applySort(dividers, payload)));
}

export function* sortScenarioDividersSaga() {
	yield takeEvery(sortScenarioDividers.match, worker);
}
