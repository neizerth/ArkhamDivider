import { saveAs } from "file-saver";
import { call, takeEvery } from "redux-saga/effects";
import { fetchBlob } from "@/shared/api";
import { downloadFileAs } from "./downloadFileAs";

function* worker({ payload }: ReturnType<typeof downloadFileAs>) {
	const { url, name } = payload;
	const blob: Blob = yield call(fetchBlob, url);

	saveAs(blob, name);
}

export function* downloadFileAsSaga() {
	yield takeEvery(downloadFileAs.match, worker);
}
