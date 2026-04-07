import { playerCornerColor } from "../../../config";
import type { ArkhamStarterDividerProps } from "../../../model";

export const get3mmDividerDefaultPlayerCornerColor = (
	divider: ArkhamStarterDividerProps,
) => {
	if (divider.layoutType === "scenario") {
		return playerCornerColor.brown;
	}
	const { faction } = divider;

	if (faction && playerCornerColor[faction]) {
		return playerCornerColor[faction];
	}

	if (divider.type === "player" && divider.subtype === "weakness") {
		return playerCornerColor.white;
	}

	return playerCornerColor.brown;
};
