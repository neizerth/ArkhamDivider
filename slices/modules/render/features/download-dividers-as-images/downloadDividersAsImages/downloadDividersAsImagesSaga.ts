import { Zip, ZipPassThrough } from "fflate";
import { call, delay, put, select, takeLatest } from "redux-saga/effects";
import streamSaver from "streamsaver";
import { selectLayout } from "@/modules/divider/entities/lib";
import { selectDividersWithRelations } from "@/modules/divider/features/lib";
import { selectPrintableLayoutSize } from "@/modules/divider/shared/lib";
import { selectDPI } from "@/modules/print/shared/lib";
import type { ReturnAwaited } from "@/shared/model";
import {
	finishRender,
	type RenderDividerOptions,
	renderDivider,
	setDividerRenderId,
	setRenderProgress,
	setRenderProgressTotal,
	setRenderStatusMessage,
	setStreamMitm,
	startRender,
} from "../../../shared/lib";
import { downloadDividersAsImages } from "./downloadDividersAsImages";

function sanitizeFileName(name: string): string {
	return name.replace(/[/\\?*:<>|"]/g, "_");
}

function* worker({ payload }: ReturnType<typeof downloadDividersAsImages>) {
	const { imageFormat, dpi: payloadDpi } = payload;

	const dividers: ReturnType<typeof selectDividersWithRelations> = yield select(
		selectDividersWithRelations,
	);
	const layout: ReturnType<typeof selectLayout> = yield select(selectLayout);
	const printableLayoutSize: ReturnType<typeof selectPrintableLayoutSize> =
		yield select(selectPrintableLayoutSize);
	const dpi: ReturnType<typeof selectDPI> = yield select(selectDPI);

	const size = printableLayoutSize?.size;
	const effectiveDpi = payloadDpi ?? dpi;
	const total = dividers.length;

	if (total === 0 || !layout || !size) {
		return;
	}

	setStreamMitm();

	const fileName = `Arkham Divider - ${imageFormat.toUpperCase()}.zip`;
	const fileStream = streamSaver.createWriteStream(fileName);
	const writer = fileStream.getWriter();

	let cancelled = false;

	const zip = new Zip((err, chunk, final) => {
		if (err) {
			console.error(err);
			cancelled = true;
			return;
		}
		if (chunk) {
			writer.write(chunk).catch(() => {
				cancelled = true;
			});
		}
		if (final) {
			writer.close();
		}
	});

	yield put(
		startRender({
			message: "render.status.initializing",
			total,
			value: 0,
		}),
	);

	yield put(setRenderStatusMessage("render.status.rendering"));
	yield put(setRenderProgressTotal(total));

	const isRGB = imageFormat === "png";
	const isTIFF = imageFormat === "tiff";
	const baseOptions = {
		dpi: effectiveDpi,
		imageFormat,
		size,
	} as const;

	let progress = 0;

	try {
		for (const divider of dividers) {
			if (cancelled) {
				break;
			}

			yield put(setDividerRenderId(divider.id));
			yield delay(10);

			const options: RenderDividerOptions = isRGB
				? { ...baseOptions, dividerId: divider.id }
				: {
						...baseOptions,
						dividerId: divider.id,
						iccProfile: "USWebCoatedSWOP.icc",
						stripIccProfile: !isTIFF,
						...(isTIFF ? {} : { colourspace: "lab" }),
					};

			const contents: ReturnAwaited<typeof renderDivider> = yield call(
				renderDivider,
				options,
			);

			if (!contents) {
				continue;
			}

			const safeName = sanitizeFileName(divider.title);
			const filename = `${safeName}.${imageFormat}`;
			const file = new ZipPassThrough(filename);
			zip.add(file);
			file.push(contents as Uint8Array, true);

			progress++;
			yield put(setRenderProgress(progress));
		}
	} catch (error) {
		console.error(error);
	}

	if (!cancelled) {
		zip.end();
	}

	yield put(finishRender());
}

export function* downloadDividersAsImagesSaga() {
	yield takeLatest(downloadDividersAsImages.match, worker);
}
