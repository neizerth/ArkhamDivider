import { ascend, descend, propEq, sortWith } from "ramda";
import { put, select, takeEvery } from "redux-saga/effects";
import { changeLayoutId } from "@/modules/divider/shared/lib";
import { selectCategory, selectLayout } from "../../selectors";
import { changeLayoutColor } from "./changeLayoutColor";

function* worker({ payload }: ReturnType<typeof changeLayoutColor>) {
	const category: ReturnType<typeof selectCategory> =
		yield select(selectCategory);
	const layout: ReturnType<typeof selectLayout> = yield select(selectLayout);

	if (!category || !layout) {
		return;
	}

	const [first] = sortWith(
		[
			descend(propEq(payload, "color")),
			descend(propEq(layout.orientation, "orientation")),
			descend(propEq(layout.groupId, "groupId")),
			// ignore current layout
			ascend(propEq(layout.id, "id")),
		],
		category.layouts,
	);

	yield put(changeLayoutId(first.id));
}

export function* changeLayoutColorSaga() {
	yield takeEvery(changeLayoutColor.match, worker);
}
