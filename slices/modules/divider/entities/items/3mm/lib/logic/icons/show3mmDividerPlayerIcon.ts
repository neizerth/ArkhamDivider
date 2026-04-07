import type { ArkhamStarterDividerProps } from "../../../model";

export function show3mmDividerPlayerIcon(divider: ArkhamStarterDividerProps) {
	if (divider.layoutType !== "player") {
		return false;
	}

	return Boolean(divider.story);
}
