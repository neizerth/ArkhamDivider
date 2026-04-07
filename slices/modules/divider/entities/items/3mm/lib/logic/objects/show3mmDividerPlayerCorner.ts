import type { ArkhamStarterDividerProps } from "../../../model";

export function show3mmDividerPlayerCorner(divider: ArkhamStarterDividerProps) {
	if (divider.layoutType === "scenario") {
		return false;
	}

	return !divider.params?.icon;
}
