import { isSkillDivider } from "@/modules/divider/shared/lib";
import {
	hasCardTypeWithXP,
	hasSubtypeWithXP,
} from "@/modules/divider/shared/lib/logic/icon";
import type { Divider, DividerLayout } from "@/modules/divider/shared/model";
import { getClassicLayoutObjects } from "./getClassicLayoutObjects";

type Options = Divider & {
	layout: DividerLayout;
};
export const getIconObject = (props: Options) => {
	const O = getClassicLayoutObjects(props.layout);
	if (isSkillDivider(props)) {
		return O.icon.skill;
	}
	const withXP = hasSubtypeWithXP(props) || hasCardTypeWithXP(props);

	if (withXP) {
		return O.icon.withXP;
	}
	return O.icon;
};
