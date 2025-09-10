import type { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { createStore } from "@/shared/store";

const store = createStore();

export const StoreProvider = ({ children }: PropsWithChildren) => {
	return <Provider store={store}>{children}</Provider>;
};
