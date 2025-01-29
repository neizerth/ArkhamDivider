import { makeStore } from "@/shared/lib/store";
import type React from "react";
import { Provider } from "react-redux";

export type StoreProviderOptions = {
	children: React.ReactNode;
};

const store = makeStore();

export const StoreProvider = ({ children }: StoreProviderOptions) => {
	return <Provider store={store}>{children}</Provider>;
};
