import type { LocalePDFStyleCallback } from "@/modules/pdf/shared/model";
import { classicDividerTextColor } from "../../config/common";

/*
fontSize: mm(5),
		fontFamily: "Arkhamic, Teutonic, serif",
		textAlign: "center",
		position: "absolute",
		top: mm(3.8),
		height: mm(7.5),
		left: mm(8.66),
		right: mm(10.16),
*/

const _getTextViewStyles: LocalePDFStyleCallback = (mm) => ({
	default: {
		position: "absolute",
		top: mm(3.8),
		height: mm(7.5),
		left: mm(8.66),
		right: mm(10.16),
	},
});

export const getTextStyles: LocalePDFStyleCallback = (mm) => ({
	default: {
		lineHeight: 1,
		color: classicDividerTextColor,
		position: "absolute",
		textAlign: "center",
		fontSize: mm(5),
		fontFamily: "Arkhamic",
		top: mm(3.8),
		height: mm(7.5),
		left: mm(8.66),
		right: mm(10.16),
	},
	ru: {
		fontFamily: "Conkordia",
		top: mm(3),
		fontSize: mm(4.58),
		height: mm(7),
	},
});
