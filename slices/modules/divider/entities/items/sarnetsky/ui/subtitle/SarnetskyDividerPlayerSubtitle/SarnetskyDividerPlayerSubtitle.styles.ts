import type { PrintSxCallback } from "@/modules/print/shared/model";
import type { SarnetskyDividerSxCallback } from "../../../model";

export const getSx: SarnetskyDividerSxCallback = ({ mm, objects: O }) => {
	return {
		fontSize: mm(O.subtitle.fontSize),
		lineHeight: O.subtitle.lineHeight,
		fontFamily: "ArnoPro, serif",
		textAlign: "center",
	};
};

export const getIconSx: PrintSxCallback = ({ mm }) => {
	return {
		position: "relative",
		top: mm(0.3),
	};
};
