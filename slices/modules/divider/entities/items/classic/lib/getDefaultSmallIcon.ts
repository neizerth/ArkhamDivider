import type { Divider } from "@/modules/divider/shared/model";

export const getDefaultSmallIcon = (props: Divider) => {
	const { icon } = props;
	if (props.type !== "player") {
		return icon;
	}
	return props.faction;
};
