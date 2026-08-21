import { createContext, useContext } from "react";
import type { DividerWithRelations } from "@/modules/divider/shared/model";

export const DividerContext =
	createContext<DividerWithRelations<unknown> | null>(null);

export const useDividerContext = <T = unknown>(): DividerWithRelations<T> => {
	return useContext(DividerContext) as DividerWithRelations<T>;
};
