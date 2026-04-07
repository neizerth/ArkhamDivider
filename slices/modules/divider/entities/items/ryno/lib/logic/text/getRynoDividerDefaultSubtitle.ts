import type { RynoDividerProps } from "../../../model";

export const getRynoDividerDefaultSubtitle = (props: RynoDividerProps) => {
	return props.story?.name;
};
