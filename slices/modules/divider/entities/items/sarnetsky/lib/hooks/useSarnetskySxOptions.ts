import { useMemo } from "react";
import { selectLayout } from "@/modules/divider/entities/lib";
import { getDividerFaction } from "@/modules/divider/shared/lib";
import { getDividerXPCost } from "@/modules/divider/shared/lib/logic";
import type { DividerLayout } from "@/modules/divider/shared/model";
import { useAppSelector } from "@/shared/lib";
import type {
	SarnetskyDividerCallbackProps,
	SarnetskyDividerProps,
} from "../../model";
import { getSarnetskyLayoutObjects } from "../logic";

export const useSarnetskySxOptions = (props: SarnetskyDividerProps) => {
	const layout = useAppSelector(selectLayout) as DividerLayout;
	const O = useMemo(() => getSarnetskyLayoutObjects(layout), [layout]);
	const faction = getDividerFaction(props);
	const xpCost = getDividerXPCost(props);

	return useMemo((): SarnetskyDividerCallbackProps => {
		return {
			objects: O,
			orientation: layout.orientation,
			type: props.type,
			faction,
			xpCost,
		};
	}, [O, layout.orientation, props.type, faction, xpCost]);
};
