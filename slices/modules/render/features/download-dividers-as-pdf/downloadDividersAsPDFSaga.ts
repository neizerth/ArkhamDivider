import { takeEvery } from "redux-saga/effects";
import { downloadDividersAsPDF } from "./downloadDividersAsPDF";

function* worker({ payload }: ReturnType<typeof downloadDividersAsPDF>) {}

export function* downloadDividersAsPDFSaga() {
	yield takeEvery(downloadDividersAsPDF.match, worker);
}
