import { getFactionIcon } from "@/modules/faction/shared/lib";
import type { TCGDividerStickerProps } from "../../../model";

export const getDefaultTCGDividerStickerIcon = (
	props: TCGDividerStickerProps,
) => {
	if (props.layoutType === "scenario") {
		return props.icon;
	}

	return getFactionIcon(props.faction);
};
