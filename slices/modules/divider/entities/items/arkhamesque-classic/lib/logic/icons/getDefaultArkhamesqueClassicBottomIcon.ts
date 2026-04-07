import { getFactionIcon } from "@/modules/faction/shared/lib";
import type { ArkhamesqueClassicDividerProps } from "../../../model";

export const getDefaultArkhamesqueClassicBottomIcon = (
	props: ArkhamesqueClassicDividerProps,
) => {
	if (props.layoutType === "scenario") {
		return props.story.icon;
	}
	const { faction } = props;
	if (faction === "multiclass") {
		return "multiclass_arkhamesque";
	}
	return getFactionIcon(props.faction);
};
