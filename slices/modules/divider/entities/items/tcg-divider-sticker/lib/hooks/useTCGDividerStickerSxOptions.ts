import { useMemo } from "react";
import { selectLayout } from "@/modules/divider/entities/lib";
import { getDividerXPCost } from "@/modules/divider/shared/lib/logic";
import { useAppSelector } from "@/shared/lib";
import type {
	TCGDividerStickerLayout,
	TCGDividerStickerProps,
	TCGDividerStickerSxOptions,
} from "../../model";
import { getTCGDividerStickerLayoutObjects } from "../logic";

export const useTCGDividerStickerSxOptions = (
	props: TCGDividerStickerProps,
) => {
	const layout = useAppSelector(selectLayout) as TCGDividerStickerLayout;
	const xpCost = getDividerXPCost(props);
	const withScenario = props.type === "scenario";
	const withXP = Boolean(xpCost);
	const { orientation } = layout;

	return useMemo(
		(): TCGDividerStickerSxOptions => ({
			objects: getTCGDividerStickerLayoutObjects({
				layout,
				withXP,
				withScenario,
				orientation,
			}),
		}),
		[layout, withXP, withScenario, orientation],
	);
};
