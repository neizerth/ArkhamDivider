import { put, select, takeEvery } from "redux-saga/effects";
import { getDividerLayoutGrid } from "@/modules/divider/entities/lib";
import { selectLayout, setLayoutId } from "@/modules/divider/shared/lib";
import {
	selectBleedEnabled,
	selectPageFormat,
	setOrientation,
	setPageLayoutGrid,
	setPageSize,
} from "@/modules/print/shared/lib";
import type { Orientation } from "@/shared/model";

function* worker() {
	const layout: ReturnType<typeof selectLayout> = yield select(selectLayout);

	if (!layout) {
		return;
	}

	const pageFormat: ReturnType<typeof selectPageFormat> =
		yield select(selectPageFormat);

	if (!pageFormat) {
		return;
	}

	const withBleed: ReturnType<typeof selectBleedEnabled> =
		yield select(selectBleedEnabled);

	const { rotated, ...grid } = getDividerLayoutGrid({
		layout,
		pageFormat,
		withBleed,
	});

	const orientation: Orientation = rotated ? "landscape" : "portrait";

	yield put(setPageLayoutGrid(grid));
	yield put(setOrientation(orientation));
}

export function* setLayoutGridOnLayoutChangeSaga() {
	yield takeEvery(setLayoutId.match, worker);
	yield takeEvery(setPageSize.match, worker);
}
