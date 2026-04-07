import type { ArkhamStarterDividerProps } from "../../../model";

export function show3mmDividerIconCorner(props: ArkhamStarterDividerProps) {
	if (props.layoutType === "scenario") {
		return true;
	}

	return Boolean(props.params?.icon);
}
