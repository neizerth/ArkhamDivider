import type { PropsWithChildren } from "react";
import { useArkhamesqueClassicData } from "@/modules/divider/entities/items/arkhamesque-classic/lib";

export const ArkhamesqueClassicProvider = ({ children }: PropsWithChildren) => {
	useArkhamesqueClassicData();

	return children;
};
