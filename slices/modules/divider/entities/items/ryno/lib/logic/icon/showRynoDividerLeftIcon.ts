import type { RynoDividerProps } from "../../../model";
import { showRynoDividerCornerImage } from "../image/showRynoDividerCornerImage";

export const showRynoDividerLeftIcon = (props: RynoDividerProps) => {
	if (props.layoutType === "scenario") {
		return true;
	}

	return showRynoDividerCornerImage(props);
};
