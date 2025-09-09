import { put, select, takeEvery } from "redux-saga/effects";

function* worker({ payload }: ReturnType<typeof <ActionName>>) {

}

export function* <FTName>() {
  yield takeEvery(<ActionName>.match, worker);
}