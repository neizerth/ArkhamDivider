import type { ArkhamesqueClassicDividerProps } from "../../../model";

export const showArkhamesqueClassicIcon = (
	props: ArkhamesqueClassicDividerProps,
) => {
	return props.layoutType === "scenario";
};
