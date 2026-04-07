import type { ArkhamStarterDividerProps } from "../../../model";

export const get3mmDividerDefaultIcon = (props: ArkhamStarterDividerProps) => {
	if (props.layoutType === "scenario") {
		return props.icon;
	}

	return null;
};
