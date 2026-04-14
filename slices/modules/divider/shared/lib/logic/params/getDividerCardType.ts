import type { Divider } from "../../../model";

export const getDividerCardType = <T extends Divider<unknown>>(props: T) => {
	if (props.type !== "player") {
		return;
	}
	return props.cardType;
};
