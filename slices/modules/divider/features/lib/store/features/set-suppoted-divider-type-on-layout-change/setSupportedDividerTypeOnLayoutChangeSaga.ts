import { put, select, takeEvery } from "redux-saga/effects";
import { selectLayout } from "@/modules/divider/entities/lib";
import {
	changeDividerType,
	selectDividerType,
	setLayoutId,
} from "@/modules/divider/shared/lib";

function* worker() {
	const layout: ReturnType<typeof selectLayout> = yield select(selectLayout);

	if (!layout) {
		return;
	}

	const supportedTypes = layout.types;

	const dividerType: ReturnType<typeof selectDividerType> =
		yield select(selectDividerType);

	if (supportedTypes.includes(dividerType)) {
		return;
	}

	const [type] = supportedTypes;

	yield put(changeDividerType(type));
}

export function* setSupportedDividerTypeOnLayoutChangeSaga() {
	yield takeEvery(setLayoutId.match, worker);
}
