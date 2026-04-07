import { createContext, useContext } from "react";
import type {
	ArkhamStarterDividerProps,
	ArkhamStarterDividerTitleObject,
} from "../../model";

type ArkhamStarterDividerContextValue = {
	divider: ArkhamStarterDividerProps;
	titleObject: ArkhamStarterDividerTitleObject;
};

export const ArkhamStarterDividerContext =
	createContext<ArkhamStarterDividerContextValue>({
		divider: {} as ArkhamStarterDividerProps,
		titleObject: {} as ArkhamStarterDividerTitleObject,
	});

export const useArkhamStarterDividerContext = () =>
	useContext(ArkhamStarterDividerContext);
