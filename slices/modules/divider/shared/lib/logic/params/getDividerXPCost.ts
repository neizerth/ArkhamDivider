import type { Divider } from "../../../model";

export const getDividerXPCost = <T extends Divider<unknown>>(props: T) => {
	if (props.type !== "player") {
		return;
	}
	return props.xpCost;
};
