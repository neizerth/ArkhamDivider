import type { PropsWithChildren } from "react";
import { ArkhamesqueClassicProvider } from "../ArkhamesqueClassicProvider";

export const DividerProvider = (props: PropsWithChildren) => {
	return <ArkhamesqueClassicProvider {...props} />;
};
