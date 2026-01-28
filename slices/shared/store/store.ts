import type { Action, ThunkAction } from "@reduxjs/toolkit";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { createMigrate, persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import createSagaMiddleware, { type SagaMiddleware } from "redux-saga";
import { router } from "@/modules/core/router/app/config";
import { currentMigrationVersion, migrationManifest } from "./migrations";
import reducer from "./reducer";
import { rootSaga } from "./sagas";

export type AppStore = ReturnType<typeof createStore>["store"];
export type RootState = ReturnType<AppStore["getState"]>;
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
	blacklist: ["story"],
};

const rootReducer = combineReducers(reducer);

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const createStore = () => {
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

	return { store, persistor };
};
