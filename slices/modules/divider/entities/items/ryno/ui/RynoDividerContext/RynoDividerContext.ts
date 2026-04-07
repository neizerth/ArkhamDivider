import { createContext, useContext } from "react";
import type { RynoDividerProps } from "../../model";

type RynoDividerContextProps = {
	divider: RynoDividerProps;
};

export const RynoDividerContext = createContext<RynoDividerContextProps>({
	divider: {} as RynoDividerProps,
});

export const useRynoDividerContext = () => useContext(RynoDividerContext);
