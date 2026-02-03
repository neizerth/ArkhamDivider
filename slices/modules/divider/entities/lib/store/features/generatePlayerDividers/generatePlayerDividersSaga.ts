import { put, takeEvery } from "redux-saga/effects";
import {
	addManyDividers,
	setDividers,
} from "@/modules/divider/shared/lib/store/dividers";
import { generatePlayerDividers } from "./generatePlayerDividers";
import { getPlayerDividers } from "./lib";

function* worker({ payload }: ReturnType<typeof generatePlayerDividers>) {
	const { mode } = payload;
	const dividers = getPlayerDividers(payload);

	if (mode === "create") {
		yield put(setDividers(dividers));
	} else if (mode === "add") {
		yield put(addManyDividers(dividers));
	}
}

export function* generatePlayerDividersSaga() {
	yield takeEvery(generatePlayerDividers.match, worker);
}
