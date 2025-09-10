import type { Action, ThunkAction } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware, { type SagaMiddleware } from "redux-saga";
import reducer from "./reducer";
import { rootSaga } from "./sagas";

// Типы для store

export type AppStore = ReturnType<typeof createStore>;
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

let store: AppStore | null = null;
let sagaMiddleware: SagaMiddleware | null = null;

export const createStore = () => {
	sagaMiddleware = createSagaMiddleware();
	const store = configureStore({
		reducer,
		middleware: (getDefaultMiddleware) => {
			const middleware = getDefaultMiddleware();
			if (sagaMiddleware) {
				middleware.push(sagaMiddleware);
			}
			return middleware;
		},
	});

	if (sagaMiddleware) {
		sagaMiddleware.run(rootSaga);
	}

	return store;
};

export const getStore = (): AppStore => {
	if (!store) {
		store = createStore();
	}
	return store;
};
