import type { Divider } from "../../../model";

export const hasCardTypeWithXP = (props: Divider) => {
	if (props.type !== "player") {
		return false;
	}
	return Boolean(props.cardType);
};
