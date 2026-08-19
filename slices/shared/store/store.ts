import type { Action, Reducer, ThunkAction } from "@reduxjs/toolkit";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { createMigrate, persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import createSagaMiddleware, { type SagaMiddleware } from "redux-saga";
import { router } from "@/modules/core/router/app/config";
import { createInjectReducer, type LazyInjectedState } from "./injectReducer";
import { createInjectSaga } from "./injectSaga";
import { currentMigrationVersion, migrationManifest } from "./migrations";
import staticReducerMap from "./reducer";
import { rootSaga } from "./sagas";

const staticRootReducer = combineReducers(staticReducerMap);

/** State from static reducers only (no code-splitting). */
export type StaticRootState = ReturnType<typeof staticRootReducer>;

/** Full state: static slices plus optionally injected lazy reducers. */
export type RootState = StaticRootState & Partial<LazyInjectedState>;

export type AppStore = ReturnType<typeof createStore>["store"];
export type AppDispatch = AppStore["dispatch"];

export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action
>;

export type AppSelector<ReturnType = unknown> = (
	state: RootState,
) => ReturnType;

/**
 * Explicit allow-list instead of a deny-list: a new slice is transient by default
 * and has to opt into persistence, rather than leaking into storage until someone
 * remembers to blacklist it.
 *
 * Deliberately NOT persisted:
 * - `router`   — resynced from the real router on mount (`useRouterLocation`),
 *                so a stored location is stale at best.
 * - `render`   — export progress / capture flags; persisting them stranded the UI
 *                in a `pending` state after a reload.
 * - `story`    — derived from the route.
 * - `arkhamesqueClassic`, `arkhamIndex` — lazily injected, refetched on demand.
 *
 * Note for `injectReducer`: lazily injected slices are not persisted unless their
 * key is added here.
 */
const persistWhitelist = [
	// user data
	"dividers",
	"divider",
	"print",
	"i18n",
	"app",
	// core data cache — lets the app render from storage while `core.json` refetches
	// in the background (see `loadCoreDataSaga` / `selectAppDataLoaded`)
	"stories",
	"icons",
	"encounterSet",
];

const persistConfig = {
	key: "root",
	storage,
	migrate: createMigrate(migrationManifest, { debug: false }),
	version: currentMigrationVersion,
	whitelist: persistWhitelist,
	/**
	 * Every write serializes and stores the *whole* persisted state, not just the
	 * changed slice — the core-data cache alone is ~880 KB, and `localStorage.setItem`
	 * is synchronous. At the default `throttle: 0` the interval is clamped to ~4 ms,
	 * so a stream of dispatches (color picker drag, layout measurement) means a
	 * continuous ~880 KB write on the main thread.
	 *
	 * Caveat: redux-persist drains one queued key per interval tick and only writes
	 * once the queue empties, so flush latency is `throttle * changedKeys`. With a
	 * handful of keys that is a second or two; `persistor.flush()` on page hide
	 * covers the tail.
	 */
	throttle: 1000,
};

export const createStore = () => {
	const asyncReducers: Record<string, Reducer> = {};

	const buildRootReducer = () =>
		combineReducers({
			...staticReducerMap,
			...asyncReducers,
		});

	const persistedReducer = persistReducer(persistConfig, buildRootReducer());

	const sagaMiddleware: SagaMiddleware = createSagaMiddleware();

	sagaMiddleware.setContext({
		router,
	});

	const store = configureStore({
		reducer: persistedReducer,
		middleware: (getDefaultMiddleware) => {
			const middleware = getDefaultMiddleware({
				serializableCheck: false,
				immutableCheck: false,
			});
			middleware.push(sagaMiddleware);
			return middleware;
		},
	});

	const persistor = persistStore(store);

	// `throttle` delays writes by up to a second, so force a write when the page is
	// about to go away — otherwise the last edits before a close/tab switch are lost.
	if (typeof window !== "undefined") {
		const flush = () => {
			void persistor.flush();
		};
		window.addEventListener("pagehide", flush);
		document.addEventListener("visibilitychange", () => {
			if (document.visibilityState === "hidden") {
				flush();
			}
		});
	}

	sagaMiddleware.run(rootSaga);

	const injectReducer = createInjectReducer({
		store,
		persistor,
		persistConfig,
		buildRootReducer,
		asyncReducers,
	});

	const injectSaga = createInjectSaga({ sagaMiddleware });

	return { store, persistor, injectReducer, injectSaga };
};
