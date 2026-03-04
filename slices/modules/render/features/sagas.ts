import { spawn } from "redux-saga/effects";
import { clearRenderingOnStartSaga } from "./clear-rendering-on-start/clearRenderingOnStartSaga";
import { downloadDividersAsImagesSaga } from "./download-dividers-as-images/downloadDividersAsImages/downloadDividersAsImagesSaga";
import { downloadDividersAsPDFSaga } from "./download-dividers-as-pdf/downloadDividersAsPDFSaga";

export function* renderFeaturesSaga() {
	yield spawn(downloadDividersAsPDFSaga);
	yield spawn(downloadDividersAsImagesSaga);
	yield spawn(clearRenderingOnStartSaga);
}
