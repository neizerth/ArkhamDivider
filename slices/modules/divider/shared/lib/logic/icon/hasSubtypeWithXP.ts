import type { Divider } from "@/modules/divider/shared/model";

export const hasSubtypeWithXP = (props: Divider) => {
	if (props.type !== "player") {
		return false;
	}
	const { subtype } = props;
	if (!subtype) {
		return false;
	}
	return ["bonded", "customizations"].includes(subtype);
};
