import type { InjectReducerFn } from "./injectReducer";
import type { InjectSagaFn } from "./injectSaga";

let injectReducerRef: InjectReducerFn | undefined;
let injectSagaRef: InjectSagaFn | undefined;

export function registerStoreInjectApis(apis: {
	injectReducer: InjectReducerFn;
	injectSaga: InjectSagaFn;
}): void {
	injectReducerRef = apis.injectReducer;
	injectSagaRef = apis.injectSaga;
}

export function getInjectReducer(): InjectReducerFn {
	if (!injectReducerRef) {
		throw new Error(
			"getInjectReducer: APIs not registered — ensure the app store bootstrap ran before this module.",
		);
	}
	return injectReducerRef;
}

export function getInjectSaga(): InjectSagaFn {
	if (!injectSagaRef) {
		throw new Error(
			"getInjectSaga: APIs not registered — ensure the app store bootstrap ran before this module.",
		);
	}
	return injectSagaRef;
}
