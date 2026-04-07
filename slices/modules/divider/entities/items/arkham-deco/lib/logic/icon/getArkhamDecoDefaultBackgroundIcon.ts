import { getFactionIcon } from "@/modules/faction/shared/lib";
import type { ArkhamDecoDividerProps } from "../../../model";

export const getArkhamDecoDefaultBackgroundIcon = (
	props: ArkhamDecoDividerProps,
) => {
	if (props.type === "player") {
		return getFactionIcon(props.faction);
	}
	return props.icon;
};
