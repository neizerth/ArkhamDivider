import type { Saga, SagaMiddleware } from "redux-saga";

/**
 * Declare lazy saga keys and saga types via declaration merging, for example:
 *
 * ```ts
 * declare module "@/shared/store" {
 *   interface LazyInjectedSagas {
 *     myFeature: typeof myFeatureSaga;
 *   }
 * }
 * ```
 */
// biome-ignore lint/suspicious/noEmptyInterface: intentionally empty; extended via declaration merging
export interface LazyInjectedSagas {}

/** `injectSaga` overloads: strict when keys exist on `LazyInjectedSagas`, otherwise `Saga`. */
export type InjectSagaFn = {
	<K extends keyof LazyInjectedSagas & string>(
		key: K,
		saga: LazyInjectedSagas[K],
	): void;
	(key: string, saga: Saga): void;
};

type CreateInjectSagaOptions = {
	sagaMiddleware: SagaMiddleware;
};

export function createInjectSaga({
	sagaMiddleware,
}: CreateInjectSagaOptions): InjectSagaFn {
	const registeredKeys = new Set<string>();

	function injectSagaImpl(key: string, saga: Saga): void {
		if (registeredKeys.has(key)) {
			if (import.meta.env.DEV) {
				console.warn(
					`[injectSaga] key "${key}" is already registered — duplicate call ignored.`,
				);
			}
			return;
		}
		registeredKeys.add(key);
		sagaMiddleware.run(saga);
	}

	return injectSagaImpl as InjectSagaFn;
}
