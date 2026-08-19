import { spawn } from "redux-saga/effects";

export function* renderFeaturesSaga() {
	const { downloadDividersAsPDFSaga, downloadDividersAsImagesSaga } =
		yield import("./renderFeaturesDownloadSagas");
	yield spawn(downloadDividersAsPDFSaga);
	yield spawn(downloadDividersAsImagesSaga);
}
