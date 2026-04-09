import { createContext, useContext } from "react";
import type {
	ArkhamIndexDividerLayout,
	ArkhamIndexDividerProps,
	ArkhamIndexDividerSxOptions,
} from "../../model";

type ArkhamIndexContextParams = {
	divider: ArkhamIndexDividerProps;
	layout: ArkhamIndexDividerLayout;
	sxOptions: ArkhamIndexDividerSxOptions;
};

export const ArkhamIndexContext = createContext<ArkhamIndexContextParams>({
	divider: {} as ArkhamIndexDividerProps,
	layout: {} as ArkhamIndexDividerLayout,
	sxOptions: {} as ArkhamIndexDividerSxOptions,
});

export const useArkhamIndexContext = () => useContext(ArkhamIndexContext);
