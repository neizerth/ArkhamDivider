import { put, select, takeEvery } from "redux-saga/effects";
import { selectLocation, setLocation } from "@/modules/core/router/shared/lib";
import { changeLocation, locationChanged } from "./changeLocation";

function* worker({ payload }: ReturnType<typeof changeLocation>) {
	const prevLocation: ReturnType<typeof selectLocation> =
		yield select(selectLocation);

	yield put(setLocation(payload));

	yield put(
		locationChanged({
			prevLocation,
			location: payload,
		}),
	);
}

export function* changeLocationSaga() {
	yield takeEvery(changeLocation.match, worker);
}
