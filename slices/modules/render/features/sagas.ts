import { fork } from "redux-saga/effects";
import { downloadDividersAsPDFSaga } from "./download-dividers-as-pdf/downloadDividersAsPDFSaga";

export function* renderFeaturesSaga() {
	yield fork(downloadDividersAsPDFSaga);
}
