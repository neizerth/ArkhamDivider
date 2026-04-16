import { put, select, takeEvery } from "redux-saga/effects";
import {
	getDividerLayoutGrid,
	selectLayout,
} from "@/modules/divider/entities/lib";
import { setLayoutId } from "@/modules/divider/shared/lib";
import {
	selectBleedEnabled,
	selectPageFormat,
	selectPagePadding,
	setBleedEnabled,
	setOrientation,
	setPageLayoutGrid,
	setPagePadding,
	setPageSize,
} from "@/modules/print/shared/lib";
import type { Orientation } from "@/shared/model";

function* worker() {
	console.log("Set layout grid on layout change");
	const layout: ReturnType<typeof selectLayout> = yield select(selectLayout);

	if (!layout) {
		console.log("No layout");
		return;
	}

	const pageFormat: ReturnType<typeof selectPageFormat> =
		yield select(selectPageFormat);

	if (!pageFormat) {
		console.log("No page format");
		return;
	}

	const withBleed: ReturnType<typeof selectBleedEnabled> =
		yield select(selectBleedEnabled);
	const pagePadding: ReturnType<typeof selectPagePadding> =
		yield select(selectPagePadding);

	const { rotated, ...grid } = getDividerLayoutGrid({
		layout,
		pageFormat,
		withBleed,
		pagePadding,
	});

	const orientation: Orientation = rotated ? "landscape" : "portrait";

	yield put(setPageLayoutGrid(grid));
	yield put(setOrientation(orientation));
}

export function* setLayoutGridOnLayoutChangeSaga() {
	yield takeEvery(setLayoutId.match, worker);
	yield takeEvery(setPageSize.match, worker);
	yield takeEvery(setBleedEnabled.match, worker);
	yield takeEvery(setPagePadding.match, worker);
}
