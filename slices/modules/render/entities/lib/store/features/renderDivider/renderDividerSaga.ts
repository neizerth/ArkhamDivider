import { isNumber } from "ramda-adjunct";
import type { Channel } from "redux-saga";
import {
	actionChannel,
	call,
	put,
	race,
	select,
	take,
} from "redux-saga/effects";
import {
	getDividerNodeById,
	renderCMYKDividerNode,
	renderDividerNode,
	selectRenderProgress,
	selectRenderProgressTotal,
	setDividerRenderId,
	setRenderProgress,
} from "@/modules/render/shared/lib";
import type { ReturnAwaited } from "@/shared/model";
import {
	cancelDividerRendering,
	renderDivider,
	renderDividerFailure,
	renderDividerSuccess,
} from "./renderDivider";

function* worker({ payload }: ReturnType<typeof renderDivider>) {
	const { dividerId, colorScheme, dpi, imageFormat = "png" } = payload;

	const node = getDividerNodeById(dividerId);

	if (!node) {
		console.error("Node not found");
		return;
	}

	const totalProgress: ReturnType<typeof selectRenderProgressTotal> =
		yield select(selectRenderProgressTotal);
	const progress: ReturnType<typeof selectRenderProgress> =
		yield select(selectRenderProgress);
	try {
		yield put(setDividerRenderId(dividerId));

		if (colorScheme === "rgb") {
			const work = () => renderDividerNode({ node, dpi });
			const contents: ReturnAwaited<typeof renderDividerNode> =
				yield call(work);

			yield put(
				renderDividerSuccess({
					dividerId,
					imageFormat,
					colorScheme: "rgb",
					contents,
				}),
			);
		} else {
			const work = () => renderCMYKDividerNode({ node, dpi, imageFormat });
			const contents: ReturnAwaited<typeof renderCMYKDividerNode> =
				yield call(work);

			yield put(
				renderDividerSuccess({
					dividerId,
					imageFormat,
					contents,
					colorScheme: "cmyk",
				}),
			);
		}

		if (isNumber(totalProgress) && isNumber(progress)) {
			yield put(setRenderProgress(progress + 1));
		}
	} catch (error) {
		yield put(
			renderDividerFailure({
				dividerId,
				dpi,
				colorScheme,
				imageFormat,
				error: (error as Error).message,
			}),
		);
	}
}

export function* renderDividerSaga() {
	while (true) {
		const channel: Channel<typeof renderDivider> = yield actionChannel(
			renderDivider.match,
		);

		while (true) {
			const {
				request,
				cancel,
			}: {
				request: ReturnType<typeof renderDivider> | undefined;
				cancel: ReturnType<typeof cancelDividerRendering> | undefined;
			} = yield race({
				request: take(channel),
				cancel: take(cancelDividerRendering.match),
			});

			if (cancel) {
				break;
			}

			if (request) {
				yield call(worker, request);
			}
		}
	}
}
