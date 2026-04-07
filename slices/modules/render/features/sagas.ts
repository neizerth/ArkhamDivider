import { spawn } from "redux-saga/effects";
import { clearRenderingOnStartSaga } from "./clear-rendering-on-start/clearRenderingOnStartSaga";

export function* renderFeaturesSaga() {
	yield spawn(clearRenderingOnStartSaga);
	const { downloadDividersAsPDFSaga, downloadDividersAsImagesSaga } =
		yield import("./renderFeaturesDownloadSagas");
	yield spawn(downloadDividersAsPDFSaga);
	yield spawn(downloadDividersAsImagesSaga);
}
