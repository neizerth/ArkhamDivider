import { fork } from "redux-saga/effects";
import { cancelDividerRenderingOnStartSaga } from "./cancel-divider-rendering-on-start/cancelDividerRenderingOnStartSaga";
import { clearRenderingOnStartSaga } from "./clear-rendering-on-start/clearRenderingOnStartSaga";
import { downloadDividersAsPDFSaga } from "./download-dividers-as-pdf/downloadDividersAsPDFSaga";

export function* renderFeaturesSaga() {
	yield fork(downloadDividersAsPDFSaga);
	yield fork(clearRenderingOnStartSaga);
	yield fork(cancelDividerRenderingOnStartSaga);
}
