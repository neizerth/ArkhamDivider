import { createContext, useContext } from "react";
import type { DividerWithRelations } from "@/modules/divider/shared/model";

type Context<T = unknown> = {
	divider: DividerWithRelations<T> | null;
};

export const DividerContext = createContext<Context>({
	divider: null,
});

export const useDividerContext = <T = unknown>(): Context<T> => {
	const context = useContext(DividerContext) as Context<T>;
	return context;
};
