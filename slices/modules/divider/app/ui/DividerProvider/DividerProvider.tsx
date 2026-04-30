import type { PropsWithChildren } from "react";
import { useArkhamIndexData } from "@/modules/divider/entities/items/arkham-index/lib";
import { useArkhamesqueClassicData } from "@/modules/divider/entities/items/arkhamesque-classic/lib";

export const DividerProvider = ({ children }: PropsWithChildren) => {
	useArkhamesqueClassicData();
	useArkhamIndexData();
	return children;
};
