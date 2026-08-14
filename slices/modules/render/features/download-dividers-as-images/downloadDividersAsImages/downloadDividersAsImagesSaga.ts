import type { Task } from "@redux-saga/core";
import { Zip, ZipPassThrough } from "fflate";
import {
	call,
	cancel,
	cancelled,
	fork,
	join,
	put,
	race,
	select,
	take,
	takeLatest,
} from "redux-saga/effects";
import { selectLayout } from "@/modules/divider/entities/lib";
import { selectDividersWithRelations } from "@/modules/divider/features/lib";
import {
	selectPrintableLayoutSize,
	selectScenarioParams,
} from "@/modules/divider/shared/lib";
import { selectDPI } from "@/modules/print/shared/lib";
import { createStreamingDownloadSink } from "@/modules/render/shared/lib/logic/createStreamingDownloadSink";
import type { ReturnAwaited, Side } from "@/shared/model";
import {
	cancelRender,
	finishRender,
	setDividerRenderId,
	setRenderProgress,
	setRenderProgressTotal,
	setRenderStatusMessage,
	startRender,
} from "../../../shared/lib";
import {
	type RenderDividerOptions,
	renderDivider,
} from "../../../shared/lib/node";
import {
	releaseExclusiveDownload,
	tryAcquireExclusiveDownload,
} from "../../exclusiveDownloadLock";
import { downloadDividersAsImages } from "./downloadDividersAsImages";

function sanitizeFileName(name: string): string {
	return name.replace(/[/\\?*:<>|"]/g, "_");
}

type ZipRenderItem = {
	divider: ReturnType<typeof selectDividersWithRelations>[number];
	side: Side;
	dividerIndex: number;
};

function* zipDownloadWorker({
	payload,
}: ReturnType<typeof downloadDividersAsImages>) {
	const { imageFormat, dpi: payloadDpi } = payload;

	let sink: Awaited<ReturnType<typeof createStreamingDownloadSink>> | undefined;
	let renderStarted = false;

	const dividers: ReturnType<typeof selectDividersWithRelations> = yield select(
		selectDividersWithRelations,
	);
	const layout: ReturnType<typeof selectLayout> = yield select(selectLayout);
	const printableLayoutSize: ReturnType<typeof selectPrintableLayoutSize> =
		yield select(selectPrintableLayoutSize);
	const dpi: ReturnType<typeof selectDPI> = yield select(selectDPI);
	const scenarioParams: ReturnType<typeof selectScenarioParams> =
		yield select(selectScenarioParams);

	const size = printableLayoutSize?.size;
	const effectiveDpi = payloadDpi ?? dpi;
	const { singleSide = false } = scenarioParams;

	// singleSide backs differ (blank) and only exist in the DOM when duplex is on;
	// the store still has front-only scenario/player dividers, so expand here.
	const items: ZipRenderItem[] = dividers.flatMap((divider, dividerIndex) => {
		if (singleSide && divider.side !== "back") {
			return [
				{ divider, side: "front" as const, dividerIndex },
				{ divider, side: "back" as const, dividerIndex },
			];
		}
		return [
			{
				divider,
				side: (divider.side ?? "front") as Side,
				dividerIndex,
			},
		];
	});
	const total = items.length;

	if (total === 0 || !layout || !size) {
		return;
	}

	const fileName = `Arkham Divider - ${imageFormat.toUpperCase()}.zip`;

	try {
		try {
			sink = yield call(createStreamingDownloadSink, {
				suggestedName: fileName,
				mimeType: "application/zip",
				types: [
					{
						description: "ZIP",
						accept: { "application/zip": [".zip"] },
					},
				],
			});
		} catch (e) {
			if (e instanceof DOMException && e.name === "AbortError") {
				return;
			}
			throw e;
		}

		if (sink === undefined) {
			return;
		}

		const streamSink = sink;

		let zipFailed = false;

		const zip = new Zip((err, chunk, final) => {
			if (err) {
				console.error(err);
				zipFailed = true;
				return;
			}
			if (chunk) {
				streamSink.write(chunk).catch(() => {
					zipFailed = true;
				});
			}
			if (final) {
				void streamSink.close();
			}
		});

		yield put(
			startRender({
				renderType: "zip",
				message: "render.status.initializing",
				total,
				value: 0,
			}),
		);
		renderStarted = true;

		yield put(setRenderStatusMessage("render.status.rendering"));
		yield put(setRenderProgressTotal(total));

		let progress = 0;

		try {
			for (let i = 0; i < total; i++) {
				const { divider, side, dividerIndex } = items[i];

				if (zipFailed) {
					break;
				}

				yield put(setDividerRenderId(divider.id));

				const options: RenderDividerOptions = {
					dividerId: divider.id,
					side,
					dpi: effectiveDpi,
					imageFormat,
					size,
					...layout.renderOptions,
				};

				const contents: ReturnAwaited<typeof renderDivider> = yield call(
					renderDivider,
					options,
				);

				if (!contents) {
					continue;
				}

				const safeName = sanitizeFileName(divider.title);
				const index = (dividerIndex + 1)
					.toString()
					.padStart(dividers.length.toString().length, "0");
				const sideSuffix = singleSide ? `_${side}` : "";

				const filename = `${index}_${safeName}${sideSuffix}.${imageFormat}`;
				const file = new ZipPassThrough(filename);
				zip.add(file);
				file.push(contents as Uint8Array, true);

				progress++;
				yield put(setRenderProgress(progress));
			}
		} catch (error) {
			console.error(error);
			zipFailed = true;
		}

		if (!zipFailed) {
			zip.end();
		} else {
			yield call(() => streamSink.abort());
		}
	} finally {
		const sagaCancelled = (yield cancelled()) as boolean;
		if (sagaCancelled) {
			const sinkToAbort = sink;
			if (sinkToAbort) {
				yield call(() => sinkToAbort.abort());
			}
		}
		if (renderStarted) {
			yield put(finishRender());
		}
	}
}

function* zipDownloadGuard(
	action: ReturnType<typeof downloadDividersAsImages>,
) {
	if (!tryAcquireExclusiveDownload("zip")) {
		return;
	}
	try {
		const task: Task = yield fork(zipDownloadWorker, action);
		const result: { done?: unknown; cancel?: unknown } = yield race({
			done: join(task),
			cancel: take(cancelRender.match),
		});
		if (result.cancel !== undefined) {
			yield cancel(task);
		}
	} finally {
		releaseExclusiveDownload();
	}
}

export function* downloadDividersAsImagesSaga() {
	yield takeLatest(downloadDividersAsImages.match, zipDownloadGuard);
}
