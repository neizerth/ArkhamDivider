import { createContext, useContext } from "react";
import type { DividerLayout } from "@/modules/divider/shared/model";
import type { SarnetskyBandProps, SarnetskyBandSxOptions } from "../../model";

export type SarnetskyBandContextProps = {
	divider: SarnetskyBandProps;
	sxOptions: SarnetskyBandSxOptions;
	layout: DividerLayout;
};

export const SarnetskyBandContext = createContext<SarnetskyBandContextProps>({
	divider: {} as SarnetskyBandProps,
	sxOptions: {} as SarnetskyBandSxOptions,
	layout: {} as DividerLayout,
});

export const useSarnetskyBandContext = () => {
	return useContext(SarnetskyBandContext);
};
