import { arkhamIndexFactionColors } from "../../../config";
import type { ArkhamIndexDividerProps } from "../../../model";

export function getArkhamIndexDividerDefaultColor(
	divider: ArkhamIndexDividerProps,
) {
	if (divider.layoutType !== "player") {
		return;
	}
	return arkhamIndexFactionColors[divider.faction];
}
