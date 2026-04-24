import { createContext, useContext } from "react";
import type {
	ArkhamIndexDividerLayout,
	ArkhamIndexDividerProps,
	ArkhamIndexDividerSxOptions,
	ArkhamIndexDividerTabSize,
} from "../../model";

type ArkhamIndexContextParams = {
	divider: ArkhamIndexDividerProps;
	tabSize: ArkhamIndexDividerTabSize;
	tabIndex: number;
	layout: ArkhamIndexDividerLayout;
	sxOptions: ArkhamIndexDividerSxOptions;
};

export const ArkhamIndexContext = createContext<ArkhamIndexContextParams>({
	divider: {} as ArkhamIndexDividerProps,
	tabSize: 1,
	tabIndex: 0,
	layout: {} as ArkhamIndexDividerLayout,
	sxOptions: {} as ArkhamIndexDividerSxOptions,
});

export const useArkhamIndexContext = () => useContext(ArkhamIndexContext);
