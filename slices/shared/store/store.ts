import type { Action, ThunkAction } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware, { type SagaMiddleware } from "redux-saga";
import { rootSaga } from "./sagas";
import reducer from "./reducer";

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

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
	reducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			thunk: false, // Отключаем thunk, так как используем saga
		}).concat(sagaMiddleware),
});

// Запускаем root saga
sagaMiddleware.run(rootSaga);

// Infer the type of makeStore
export type AppStore = typeof store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
