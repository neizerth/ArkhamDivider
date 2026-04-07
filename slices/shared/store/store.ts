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

const persistConfig = {
	key: "root",
	storage,
	migrate: createMigrate(migrationManifest, { debug: false }),
	version: currentMigrationVersion,
	blacklist: ["story", "arkhamesqueClassic"],
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

	sagaMiddleware.run(rootSaga);

	const injectReducer = createInjectReducer({
		store,
		persistConfig,
		buildRootReducer,
		asyncReducers,
	});

	const injectSaga = createInjectSaga({ sagaMiddleware });

	return { store, persistor, injectReducer, injectSaga };
};
