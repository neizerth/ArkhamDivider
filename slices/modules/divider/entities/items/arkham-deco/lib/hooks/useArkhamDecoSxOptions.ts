import { useMemo } from "react";
import { selectLayout } from "@/modules/divider/entities/lib";
import { selectPlayerParams } from "@/modules/divider/shared/lib";
import { getDividerXPCost } from "@/modules/divider/shared/lib/logic";
import { useAppSelector } from "@/shared/lib";
import type {
	ArkhamDecoDividerLayout,
	ArkhamDecoDividerProps,
	ArkhamDecoDividerSxOptions,
} from "../../model";
import { getArkhamDecoIcons, getArkhamDecoLayoutObjects } from "../logic";

export function useArkhamDecoSxOptions(divider: ArkhamDecoDividerProps) {
	const layout = useAppSelector(selectLayout) as ArkhamDecoDividerLayout;
	const { sideXP } = useAppSelector(selectPlayerParams);
	const { type } = divider;

	const xpCost = getDividerXPCost(divider);
	const layoutId = layout.id;
	const tab = layout.params?.tab ?? false;
	const icons = getArkhamDecoIcons({ divider, layout });

	const withCentralIcon = Boolean(icons.center?.icon);

	return useMemo((): ArkhamDecoDividerSxOptions => {
		const objects = getArkhamDecoLayoutObjects(layoutId);
		return {
			objects,
			type,
			xpCost,
			sideXP,
			tab,
			withCentralIcon,
		};
	}, [type, layoutId, xpCost, sideXP, tab, withCentralIcon]);
}
