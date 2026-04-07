import { getFactionIcon } from "@/modules/faction/shared/lib";
import type { VintageDividerProps } from "../../model";

export const getVintageDividerDefaultIcon = (props: VintageDividerProps) => {
	if (props.layoutType === "scenario") {
		return props.icon;
	}
	if (props.layoutType === "investigator") {
		return getFactionIcon(props.faction);
	}
	return props.icon;
};
