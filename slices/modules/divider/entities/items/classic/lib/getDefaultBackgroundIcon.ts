import type { DividerWithRelations } from "@/modules/divider/shared/model";
import { getFactionIcon } from "@/modules/faction/shared/lib";

export const getDefaultBackgroundIcon = (divider: DividerWithRelations) => {
	if (divider.type === "player") {
		return getFactionIcon(divider.faction);
	}
	return divider.icon;
};
