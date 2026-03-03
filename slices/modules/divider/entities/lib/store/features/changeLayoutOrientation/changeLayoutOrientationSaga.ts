import { ascend, descend, propEq, sortWith } from "ramda";
import { put, select, takeEvery } from "redux-saga/effects";
import { changeLayoutId } from "@/modules/divider/shared/lib";
import { selectCategory, selectLayout } from "../../selectors";
import { changeLayoutOrientation } from "./changeLayoutOrientation";

function* worker({ payload }: ReturnType<typeof changeLayoutOrientation>) {
	const category: ReturnType<typeof selectCategory> =
		yield select(selectCategory);
	const layout: ReturnType<typeof selectLayout> = yield select(selectLayout);

	if (!category || !layout) {
		return;
	}

	const [first] = sortWith(
		[
			descend(propEq(layout.color, "color")),
			descend(propEq(payload, "orientation")),
			descend(propEq(layout.groupId, "groupId")),
			ascend(propEq(layout.id, "id")),
		],
		category.layouts,
	);

	yield put(changeLayoutId(first.id));
}

export function* changeLayoutOrientationSaga() {
	yield takeEvery(changeLayoutOrientation.match, worker);
}
