import { createContext, useContext } from "react";
import type { ArkhamesqueClassicDividerProps } from "../../model";

type ArkhamesqueClassicContextValue = {
	divider: ArkhamesqueClassicDividerProps;
};

export const ArkhamesqueClassicContext =
	createContext<ArkhamesqueClassicContextValue>({
		divider: {} as ArkhamesqueClassicDividerProps,
	});

export const useArkhamesqueClassicContext = () =>
	useContext(ArkhamesqueClassicContext);
