import type { Action, ThunkAction } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware, { type SagaMiddleware } from "redux-saga";
import reducer from "./reducer";
import { rootSaga } from "./sagas";

export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action
>;

// Тип для saga middleware
export type SagaMiddlewareType = SagaMiddleware<RootState>;

export type AppSelector<ReturnType = unknown> = (
	state: RootState,
) => ReturnType;

export const createStore = () => {
	const sagaMiddleware = createSagaMiddleware();
	const store = configureStore({
		reducer,
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware().concat(sagaMiddleware),
	});

	sagaMiddleware.run(rootSaga);

	return store;
};

export const store = createStore();

// Infer the type of makeStore
export type AppStore = typeof store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
