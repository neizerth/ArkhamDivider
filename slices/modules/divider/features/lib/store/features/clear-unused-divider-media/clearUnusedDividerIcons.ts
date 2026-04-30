import { isNotNil } from "ramda";
import { REHYDRATE } from "redux-persist";
import { select, take, takeEvery } from "redux-saga/effects";
import { selectLayout } from "@/modules/divider/entities/lib";
import {
	addDivider,
	addManyDividers,
	deleteAllDividers,
	deleteDivider,
	selectDividers,
	updateDivider,
} from "@/modules/divider/shared/lib";
import { getDividerMedia } from "../../../logic";

function* worker() {
	const layout: ReturnType<typeof selectLayout> = yield select(selectLayout);
	if (!layout) {
		return;
	}
	const { mediaParams = [] } = layout;
	const dividers: ReturnType<typeof selectDividers> =
		yield select(selectDividers);

	const mediaUrls = dividers
		.flatMap((divider) => getDividerMedia({ divider, mediaParams }))
		.filter(isNotNil);

	for (const url of mediaUrls) {
		URL.revokeObjectURL(url);
	}
}

export function* clearUnusedDividerMedia() {
	yield take(REHYDRATE);
	yield takeEvery(addManyDividers.match, worker);
	yield takeEvery(deleteAllDividers.match, worker);
	yield takeEvery(updateDivider.match, worker);
	yield takeEvery(deleteDivider.match, worker);
	yield takeEvery(addDivider.match, worker);
}
