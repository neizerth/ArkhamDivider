import type { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { getStore } from "@/shared/store";

const store = getStore();

export const StoreProvider = ({ children }: PropsWithChildren) => {
	return <Provider store={store}>{children}</Provider>;
};
