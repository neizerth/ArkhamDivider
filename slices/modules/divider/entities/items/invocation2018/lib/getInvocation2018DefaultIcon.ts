import { getDividerIcon } from "@/modules/divider/features/lib";
import { getDividerFaction } from "@/modules/divider/shared/lib";
import type { Divider } from "@/modules/divider/shared/model";
import { getFactionIcon } from "@/modules/faction/shared/lib";

export const getInvocation2018DefaultIcon = (props: Divider) => {
	const icon = getDividerIcon({
		divider: props,
		param: "icon",
		defaultIcon: props.icon,
	});

	const faction = getDividerFaction(props);

	if (faction && getFactionIcon(faction) === icon) {
		return;
	}
	return icon;
};
