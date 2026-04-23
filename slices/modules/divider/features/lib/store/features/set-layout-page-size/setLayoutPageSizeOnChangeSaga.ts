import { put, select, takeEvery } from "redux-saga/effects";
import { selectDividerSize } from "@/modules/divider/entities/lib";
import { setLayoutId } from "@/modules/divider/shared/lib";
import { pageSizeFormats } from "@/modules/print/shared/config";
import {
	selectDPI,
	selectPageSizePx,
	setPageSize,
} from "@/modules/print/shared/lib";
import { isBoxIncludes } from "@/shared/util";

function* worker() {
	const unitSize: ReturnType<typeof selectDividerSize> =
		yield select(selectDividerSize);

	const pageSize: ReturnType<typeof selectPageSizePx> =
		yield select(selectPageSizePx);

	if (!unitSize || !pageSize) {
		return;
	}

	const dpi: ReturnType<typeof selectDPI> = yield select(selectDPI);

	if (isBoxIncludes(pageSize, unitSize)) {
		return;
	}

	const pageFormat = pageSizeFormats.find((pageFormat) => {
		const pageSize = pageFormat.size[dpi];
		return isBoxIncludes(pageSize, unitSize);
	});

	if (!pageFormat) {
		return;
	}

	yield put(setPageSize(pageFormat.type));
}

export function* setLayoutPageSizeOnChangeSaga() {
	yield takeEvery(setLayoutId.match, worker);
	yield takeEvery(setPageSize.match, worker);
}
