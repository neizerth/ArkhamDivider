import { spawn } from "redux-saga/effects";
import { coreModuleSaga } from "./core/sagas";
import { dividerSaga } from "./divider/sagas";
import { encounterSetSaga } from "./encounterSet/sagas";
import { renderSaga } from "./render/sagas";
import { storySaga } from "./story/sagas";

export function* modulesSaga() {
	yield spawn(coreModuleSaga);
	yield spawn(storySaga);
	yield spawn(dividerSaga);
	yield spawn(encounterSetSaga);
	yield spawn(renderSaga);
}
