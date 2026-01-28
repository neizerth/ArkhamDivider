import { fork } from "redux-saga/effects";
import { downloadDividersAsPDFSaga } from "./download-dividers-as-pdf/sagas";

export function* renderFeaturesSaga() {
	yield fork(downloadDividersAsPDFSaga);
}
