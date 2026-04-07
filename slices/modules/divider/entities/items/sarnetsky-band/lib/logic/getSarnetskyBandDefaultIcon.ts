import { getFactionIcon } from "@/modules/faction/shared/lib";
import type { SarnetskyBandProps } from "../../model";

export const getSarnetskyBandDefaultIcon = (props: SarnetskyBandProps) => {
	if (props.layoutType === "scenario") {
		return props.icon;
	}
	return getFactionIcon(props.faction);
};
