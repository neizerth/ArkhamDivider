import type { PropsWithChildren } from "react";
import { useMemo } from "react";
import { Provider } from "react-redux";
import { createStore } from "@/shared/store";

export const StoreProvider = ({ children }: PropsWithChildren) => {
	const store = useMemo(() => createStore(), []);

	return <Provider store={store}>{children}</Provider>;
};
