import type { LocaleSxCallback } from "@/modules/core/i18n/shared/model";
import type { PrintSxCallback } from "@/modules/print/shared/model";
import { percent } from "@/shared/util";

export const getTextSx: LocaleSxCallback = ({ mm }) => ({
	default: {
		fontSize: mm(4.58),
		fontFamily: "Arkhamic, Teutonic, serif",
		textAlign: "center",
		position: "absolute",
		top: mm(2.6),
		height: mm(6.5),
		left: mm(7.66),
		right: mm(9.16),
	},
	ru: {
		fontFamily: "Conkordia, Arkhamic, Teutonic, serif",
	},
});

export const getIconSx: PrintSxCallback = ({ mm }) => ({
	position: "absolute",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	top: mm(2),
	right: mm(0.9),
	width: mm(8.33),
	height: mm(8.33),
	":hover": {
		opacity: percent(70),
	},
});

export const getBackgroundIconSx: PrintSxCallback = ({ mm }) => ({
	position: "absolute",
	width: mm(50),
	height: mm(50),
	opacity: percent(5),
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	top: `calc(${mm(3)} + 50%)`,
	left: `calc(50%)`,
	transform: "translate(-50%, -50%)",
	":hover": {
		opacity: percent(3),
	},
});

export const getDividerStatsSx: PrintSxCallback = ({ mm }) => ({
	position: "absolute",
	bottom: mm(6.7),
	right: mm(2.5),
});

export const getStrokeSx: PrintSxCallback = ({ mm }) => ({
	position: "absolute",
	color: "transparent",
	clipPath: `polygon(0 0, ${mm(9.5)} 0, ${mm(9.5)} 100%, 0 100%)`,
	WebkitTextStroke: `${mm(0.25)} #cab686`,
	zIndex: -1,
});
