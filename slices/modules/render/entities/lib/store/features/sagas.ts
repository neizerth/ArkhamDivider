import { spawn } from "redux-saga/effects";

export function* renderEntitiesSaga() {
	// Loaded lazily for the same reason as `renderFeaturesSaga`: this saga is spawned from
	// the root saga on startup, and a static import would pull `renderDivider` — and with it
	// `modern-screenshot` and `piexifjs` — into the initial chunk.
	const { downloadDividerAsImageSaga } = yield import(
		"./downloadDividerAsImage/downloadDividerAsImageSaga"
	);
	yield spawn(downloadDividerAsImageSaga);
}
