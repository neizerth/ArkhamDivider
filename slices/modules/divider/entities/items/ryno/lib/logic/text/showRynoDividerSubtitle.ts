import type { RynoDividerProps } from "../../../model";

export const showRynoDividerSubtitle = (props: RynoDividerProps) => {
	if (["campaign", "player", "investigator"].includes(props.type)) {
		return false;
	}
	return true;
};
