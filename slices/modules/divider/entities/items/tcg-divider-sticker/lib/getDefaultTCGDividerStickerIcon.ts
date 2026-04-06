import type { TCGDividerStickerProps } from "../model";

export const getDefaultTCGDividerStickerIcon = (
	props: TCGDividerStickerProps,
) => {
	if (props.layoutType === "scenario") {
		return props.icon;
	}

	return props.faction;
};
