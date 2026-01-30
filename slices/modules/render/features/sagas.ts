import { fork } from "redux-saga/effects";
import { clearRenderingOnStartSaga } from "./clear-rendering-on-start/clearRenderingOnStartSaga";
import { downloadDividersAsPDFSaga } from "./download-dividers-as-pdf/downloadDividersAsPDFSaga";

export function* renderFeaturesSaga() {
	yield fork(downloadDividersAsPDFSaga);
	yield fork(clearRenderingOnStartSaga);
}
