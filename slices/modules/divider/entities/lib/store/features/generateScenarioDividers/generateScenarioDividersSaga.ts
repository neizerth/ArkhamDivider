import { put, takeEvery } from "redux-saga/effects";
import { setScenarioParams } from "@/modules/divider/shared/lib";
import { generateScenarioDividers } from "./generateScenarioDividers";

function* worker({ payload }: ReturnType<typeof generateScenarioDividers>) {
	yield put(setScenarioParams(payload));
	// const add = payload === "add";
}

export function* generateScenarioDividersSaga() {
	yield takeEvery(generateScenarioDividers.match, worker);
}
