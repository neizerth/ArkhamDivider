import type { ArkhamStarterDividerProps } from "../../../model";

export const get3mmSideStripPosition = (
	props: ArkhamStarterDividerProps,
): "left" | "right" => {
	if (props.layoutType === "scenario") {
		return "right";
	}
	if (props.params?.icon) {
		return "right";
	}
	return "left";
};
