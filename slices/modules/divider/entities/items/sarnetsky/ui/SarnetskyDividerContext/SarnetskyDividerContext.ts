import { createContext, useContext } from "react";
import type {
	SarnetskyDividerCallbackProps,
	SarnetskyDividerProps,
	SarnetskyLayout,
} from "../../model";

type SarnetskyDividerContextValue = {
	divider: SarnetskyDividerProps;
	sxOptions: SarnetskyDividerCallbackProps;
	containerRef: React.RefObject<HTMLElement | null>;
	layout: SarnetskyLayout;
	singleSide: boolean;
};

export const SarnetskyDividerContext =
	createContext<SarnetskyDividerContextValue>({
		divider: {} as SarnetskyDividerProps,
		sxOptions: {} as SarnetskyDividerCallbackProps,
		containerRef: { current: null },
		layout: {} as SarnetskyLayout,
		singleSide: false,
	});

export const useSarnetskyDividerContext = () =>
	useContext(SarnetskyDividerContext);
