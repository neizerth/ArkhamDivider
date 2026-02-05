import { isSkillDivider } from "@/modules/divider/shared/lib";
import {
	hasCardTypeWithXP,
	hasSubtypeWithXP,
} from "@/modules/divider/shared/lib/logic/icon";
import type { Divider } from "@/modules/divider/shared/model";
import { classicDividerObjects as O } from "../config";

export const getIconObject = (props: Divider) => {
	if (isSkillDivider(props)) {
		return O.icon.skill;
	}
	const withXP = hasSubtypeWithXP(props) || hasCardTypeWithXP(props);

	if (withXP) {
		return O.icon.withXP;
	}
	return O.icon;
};
