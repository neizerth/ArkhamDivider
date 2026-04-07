import type { TCGDividerStickerProps } from "../../../model";

export const getDefaultTCGDividerSideIcon = (props: TCGDividerStickerProps) => {
	if (props.layoutType !== "player") {
		return;
	}

	if (props.subtype === "faction") {
		return;
	}

	return props.icon;
};
