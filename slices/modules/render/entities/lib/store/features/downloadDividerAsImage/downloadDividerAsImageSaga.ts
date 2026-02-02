import { saveAs } from "file-saver";
import { call, put, select, takeLatest } from "redux-saga/effects";
import {
	selectDividerById,
	selectPrintableLayoutSize,
} from "@/modules/divider/shared/lib";
import { selectDPI } from "@/modules/print/shared/lib";
import {
	finishRender,
	type RenderDividerOptions,
	renderDivider,
	setDividerRenderId,
	startRender,
} from "@/modules/render/shared/lib";
import type { ReturnAwaited } from "@/shared/model";

import { downloadDividerAsImage } from "./downloadDividerAsImage";

function* worker({ payload }: ReturnType<typeof downloadDividerAsImage>) {
	const { dividerId, imageFormat } = payload;

	const divider: ReturnType<typeof selectDividerById> = yield select(
		selectDividerById,
		dividerId,
	);

	const printableLayoutSize: ReturnType<typeof selectPrintableLayoutSize> =
		yield select(selectPrintableLayoutSize);

	if (!divider || !printableLayoutSize) {
		return;
	}

	const { size } = printableLayoutSize;

	const dpi: ReturnType<typeof selectDPI> = yield select(selectDPI);

	yield put(startRender({}));

	yield put(setDividerRenderId(dividerId));

	const isRGB = imageFormat === "png";
	const isTIFF = imageFormat === "tiff";

	const baseOptions = {
		dividerId,
		dpi,
		imageFormat,
		size,
	} as const;

	const options: RenderDividerOptions = isRGB
		? {
				...baseOptions,
				colourspace: "lab",
			}
		: {
				...baseOptions,
				iccProfile: "USWebCoatedSWOP.icc",
				stripIccProfile: !isTIFF,
				...(!isTIFF ? { colourspace: "lab" } : {}),
			};

	const contents: ReturnAwaited<typeof renderDivider> = yield call(
		renderDivider,
		options,
	);

	const blob = new Blob([contents as BlobPart], {
		type: `image/${imageFormat}`,
	});

	yield put(finishRender());

	const filename = `${divider.title}.${imageFormat}`;

	saveAs(blob, filename);
}

export function* downloadDividerAsImageSaga() {
	yield takeLatest(downloadDividerAsImage.match, worker);
}
