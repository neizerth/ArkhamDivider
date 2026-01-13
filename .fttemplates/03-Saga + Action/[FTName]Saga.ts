import { put, select, takeEvery } from "redux-saga/effects";
import { <FTName> } from './<FTName>'; 

function* worker({ payload }: ReturnType<typeof <FTName>>) {

}

export function* <FTName>Saga() {
  yield takeEvery(<FTName>.match, worker);
}