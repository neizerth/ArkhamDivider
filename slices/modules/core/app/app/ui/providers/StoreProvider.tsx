import type { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { createStore } from "@/shared/store";

type HmrData = {
	store?: ReturnType<typeof createStore>["store"];
	persistor?: ReturnType<typeof createStore>["persistor"];
};

const hot = import.meta.hot;
const hmrData = hot?.data as HmrData | undefined;

const created = hmrData?.store && hmrData?.persistor ? null : createStore();
const store = hmrData?.store ?? created?.store;
const persistor = hmrData?.persistor ?? created?.persistor;

if (!store || !persistor) {
	throw new Error("Failed to initialize redux store");
}

if (hot) {
	(hot.data as HmrData).store = store;
	(hot.data as HmrData).persistor = persistor;
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
