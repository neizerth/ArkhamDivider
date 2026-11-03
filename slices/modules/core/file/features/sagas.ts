import { spawn } from "redux-saga/effects";
import { downloadFileAsSaga } from "./download-file-as/downloadFileAsSaga";

export function* fileFeaturesSaga() {
	yield spawn(downloadFileAsSaga);
}
