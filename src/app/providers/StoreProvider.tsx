import React from "react";
import { Provider } from "react-redux";
import { makeStore } from "@/shared/store";

export type StoreProviderOptions = {
	children: React.ReactNode;
};

const store = makeStore();

export const StoreProvider = ({ children }: StoreProviderOptions) => {
	return <Provider store={store}>{children}</Provider>;
};
