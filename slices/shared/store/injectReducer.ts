import type { Reducer, Store } from "@reduxjs/toolkit";
import { type Persistor, persistReducer } from "redux-persist";

/**
 * Declare lazy slice keys and state types via declaration merging, for example:
 *
 * ```ts
 * declare module "@/shared/store" {
 *   interface LazyInjectedState {
 *     myFeature: MyFeatureState;
 *   }
 * }
 * ```
 */
// biome-ignore lint/suspicious/noEmptyInterface: intentionally empty; extended via declaration merging
export interface LazyInjectedState {}

/** `injectReducer` overloads: strict when keys exist on `LazyInjectedState`, otherwise `Reducer<unknown>`. */
export type InjectReducerFn = {
	<K extends keyof LazyInjectedState & string>(
		key: K,
		injected: Reducer<LazyInjectedState[K]>,
	): void;
	(key: string, injected: Reducer<unknown>): void;
};

type CreateInjectReducerOptions = {
	store: Store;
	persistor: Persistor;
	persistConfig: Parameters<typeof persistReducer>[0];
	buildRootReducer: () => Reducer;
	asyncReducers: Record<string, Reducer>;
};

export function createInjectReducer({
	store,
	persistor,
	persistConfig,
	buildRootReducer,
	asyncReducers,
}: CreateInjectReducerOptions): InjectReducerFn {
	function injectReducerImpl(key: string, injected: Reducer<unknown>): void {
		if (asyncReducers[key] !== undefined) {
			if (import.meta.env.DEV) {
				console.warn(
					`[injectReducer] key "${key}" is already registered — duplicate call ignored.`,
				);
			}
			return;
		}
		asyncReducers[key] = injected;
		store.replaceReducer(persistReducer(persistConfig, buildRootReducer()));

		/**
		 * `persistReducer` keeps `_persistoid`/`_paused` per instance and only
		 * initializes them on the PERSIST action, which `persistStore` dispatches once
		 * at startup. The instance created above never sees it, so without this call
		 * persistence stops silently for the rest of the session.
		 *
		 * Re-dispatching PERSIST creates the persistoid and unpauses. State already
		 * carries `_persist`, so redux-persist returns early — no second rehydrate.
		 */
		persistor.persist();
	}

	return injectReducerImpl as InjectReducerFn;
}
