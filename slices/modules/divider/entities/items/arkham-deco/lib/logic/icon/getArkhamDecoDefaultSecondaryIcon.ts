import type { ArkhamDecoDividerProps } from "../../../model";

export const getArkhamDecoDefaultSecondaryIcon = (
	props: ArkhamDecoDividerProps,
) => {
	if (props.layoutType === "scenario") {
		return;
	}
	if (props.type === "investigator") {
		return "investigator";
	}
	return props.faction;
};
