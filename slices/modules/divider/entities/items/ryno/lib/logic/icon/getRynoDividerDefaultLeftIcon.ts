import { getFactionIcon } from "@/modules/faction/shared/lib";
import type { RynoDividerProps } from "../../../model";

export const getRynoDividerDefaultLeftIcon = (props: RynoDividerProps) => {
	if (props.layoutType === "scenario") {
		return props.icon;
	}
	return getFactionIcon(props.faction);
};
