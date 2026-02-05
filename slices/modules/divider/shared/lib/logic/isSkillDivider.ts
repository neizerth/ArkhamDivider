import type { Divider } from "../../model";

export const isSkillDivider = (props: Divider) => {
	return props.type === "player" && props.cardType === "skill";
};
