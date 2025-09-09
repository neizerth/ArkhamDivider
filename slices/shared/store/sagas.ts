import { all } from "redux-saga/effects";

// Импортируем все саги здесь
// import { watchSomeSaga } from "./features/someFeature/sagas";

// Root saga - объединяет все саги
export function* rootSaga() {
	yield all([
		// fork(watchSomeSaga),
		// Добавляйте другие саги здесь
	]);
}
