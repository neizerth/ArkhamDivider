import { fork } from "redux-saga/effects";
import { startPDFDownloadSaga } from "./startPDFDownload";

export function* downloadDividersAsPDFSaga() {
	yield fork(startPDFDownloadSaga);
}
