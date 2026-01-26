import type { LocaleSxCallback } from "@/modules/core/i18n/shared/model";
import type { PrintSxCallback } from "@/modules/print/shared/model";

const textColor = "#2e2622";

export const getTextSx: LocaleSxCallback = ({ mm }) => ({
	default: {
		fontSize: mm(4.58),
		fontFamily: "Arkhamic, Teutonic, serif",
		textAlign: "center",
		position: "absolute",
		top: mm(2.5),
		height: mm(6.5),
		left: mm(7.66),
		right: mm(9.16),
		color: textColor,
	},
	ru: {
		fontFamily: "Conkordia, Teutonic, serif",
	},
});

export const getIconSx: PrintSxCallback = ({ mm }) => ({
	position: "absolute",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	top: mm(2),
	right: mm(0.66),
	width: mm(8.33),
	height: mm(8.33),
	color: textColor,
});
