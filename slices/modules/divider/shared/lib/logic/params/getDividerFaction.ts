import type { Divider } from "../../../model";

export const getDividerFaction = <T extends Divider<unknown>>(props: T) => {
	if ("faction" in props) {
		return props.faction;
	}
	return;
};
