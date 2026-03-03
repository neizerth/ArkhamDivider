import { REHYDRATE } from "redux-persist";
import { select, take, takeEvery } from "redux-saga/effects";
import { reveokeMediaExceptFor } from "@/modules/core/media/shared/lib";
import { selectLayout } from "@/modules/divider/entities/lib";
import {
	addDivider,
	addManyDividers,
	deleteAllDividers,
	deleteDivider,
	selectDividers,
	updateDivider,
} from "@/modules/divider/shared/lib";
import { getDividerIcons } from "../../../logic";

function* worker() {
	const layout: ReturnType<typeof selectLayout> = yield select(selectLayout);
	if (!layout) {
		return;
	}
	const { iconParams = [] } = layout;
	const dividers: ReturnType<typeof selectDividers> =
		yield select(selectDividers);

	const usedMediaIds = dividers
		.flatMap((divider) => getDividerIcons({ divider, iconParams }))
		.filter((icon) => typeof icon !== "string")
		.map((icon) => icon.mediaId as string);

	// console.log("usedMediaIds", usedMediaIds);

	reveokeMediaExceptFor(usedMediaIds);
}

export function* clearUnusedDividerIcons() {
	yield take(REHYDRATE);
	yield takeEvery(addManyDividers.match, worker);
	yield takeEvery(deleteAllDividers.match, worker);
	yield takeEvery(updateDivider.match, worker);
	yield takeEvery(deleteDivider.match, worker);
	yield takeEvery(addDivider.match, worker);
}
