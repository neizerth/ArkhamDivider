import type { Divider } from "../../../model";

export const getDividerSubtype = <T extends Divider<unknown>>(props: T) => {
	if (props.type !== "player") {
		return;
	}
	return props.subtype;
};
