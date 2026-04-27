import { arkhamIndexFactionColors } from "../../../config";
import type { ArkhamIndexDividerProps } from "../../../model";

export function getArkhamIndexDividerDefaultColor(
	divider: ArkhamIndexDividerProps,
) {
	if (divider.layoutType === "scenario") {
		return;
	}
	return arkhamIndexFactionColors[divider.faction];
}
