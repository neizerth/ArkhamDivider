import type { Divider, DividerLayout } from "@/modules/divider/shared/model";

type Options = {
	divider: Divider;
	layout: DividerLayout;
};

export const getInvocation2018Background = (props: Options) => {
	const { divider, layout } = props;
	if (!(divider.type === "investigator" || divider.type === "player")) {
		return;
	}
	const { faction } = divider;
	const { orientation } = layout;
	const prefix = `/images/divider/background/invocation/${orientation}/${faction}`;
	if (divider.type === "player" && divider.xpCost) {
		return `${prefix}_xp.png`;
	}
	return `${prefix}.png`;
};
