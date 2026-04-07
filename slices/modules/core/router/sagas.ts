import { spawn } from "redux-saga/effects";
import { routerEntitiesSaga } from "./entities/sagas";
import { routerFeaturesSaga } from "./features/sagas";

export const routerSaga = function* () {
	yield spawn(routerFeaturesSaga);
	yield spawn(routerEntitiesSaga);
};
