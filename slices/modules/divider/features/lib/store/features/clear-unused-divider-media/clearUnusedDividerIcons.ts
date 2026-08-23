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

/**
 * Object urls handed to dividers so far. The store only knows which urls are in
 * use right now, so a url that just disappeared from the dividers is only
 * recognizable by comparing against the previous pass.
 */
const trackedUrls = new Set<string>();

function* worker() {
	const layout: ReturnType<typeof selectLayout> = yield select(selectLayout);
	if (!layout) {
		return;
	}
	const { mediaParams = [] } = layout;
	const dividers: ReturnType<typeof selectDividers> =
		yield select(selectDividers);

	const usedUrls = new Set(
		dividers
			.flatMap((divider) => getDividerMedia({ divider, mediaParams }))
			.filter(isNotNil),
	);

	// Revoking the *used* urls here killed every custom image as soon as any
	// divider was updated. Only urls that dropped out of use may be revoked.
	for (const url of trackedUrls) {
		if (usedUrls.has(url)) {
			continue;
		}
		URL.revokeObjectURL(url);
		trackedUrls.delete(url);
	}

	for (const url of usedUrls) {
		trackedUrls.add(url);
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
