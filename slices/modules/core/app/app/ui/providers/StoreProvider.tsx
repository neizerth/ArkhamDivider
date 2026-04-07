import type { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { createStore, registerStoreInjectApis } from "@/shared/store";

type HmrData = {
	store?: ReturnType<typeof createStore>["store"];
	persistor?: ReturnType<typeof createStore>["persistor"];
	injectReducer?: ReturnType<typeof createStore>["injectReducer"];
	injectSaga?: ReturnType<typeof createStore>["injectSaga"];
};

const hot = import.meta.hot;
const hmrData = hot?.data as HmrData | undefined;

const created = hmrData?.store && hmrData?.persistor ? null : createStore();
const store = hmrData?.store ?? created?.store;
const persistor = hmrData?.persistor ?? created?.persistor;
const injectReducer = hmrData?.injectReducer ?? created?.injectReducer;
const injectSaga = hmrData?.injectSaga ?? created?.injectSaga;

if (!store || !persistor || !injectReducer || !injectSaga) {
	throw new Error("Failed to initialize redux store");
}

registerStoreInjectApis({ injectReducer, injectSaga });

if (hot) {
	const hmrData = hot.data as HmrData;
	hmrData.store = store;
	hmrData.persistor = persistor;
	hmrData.injectReducer = injectReducer;
	hmrData.injectSaga = injectSaga;
}

export const StoreProvider = ({ children }: PropsWithChildren) => {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				{children}
			</PersistGate>
		</Provider>
	);
};
