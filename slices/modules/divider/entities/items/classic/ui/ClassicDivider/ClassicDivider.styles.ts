import { alpha } from "@mui/material/styles";
import type { LocaleSxCallback } from "@/modules/core/i18n/shared/model";
import type { PrintSxCallback } from "@/modules/print/shared/model";
import { percent } from "@/shared/util";
import { classicDividerTextColor } from "../../config/common";

export const getTextSx: LocaleSxCallback = ({ mm }) => ({
	default: {
		fontSize: mm(5),
		lineHeight: 1.6,
		fontFamily: "Arkhamic, Teutonic, serif",
		textAlign: "center",
		position: "absolute",
		top: mm(2.6),
		height: mm(6.5),
		left: mm(8.66),
		right: mm(10.16),
	},
	ru: {
		fontSize: mm(4.58),
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
	"@media screen": {
		":hover": {
			opacity: percent(70),
		},
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
	"@media screen": {
		":hover": {
			opacity: percent(3),
		},
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
	WebkitTextStroke: `${mm(0.4)} #cab686`,
	zIndex: -1,
});

export const getDividerCardsSx: PrintSxCallback = ({ mm }) => ({
	position: "absolute",
	zIndex: 2,
	left: mm(50),
	top: mm(38),
	transform: "translate(-50%, -50%)",
	width: mm(60),
	height: mm(50),
});

export const getTitleClearSx: PrintSxCallback = ({ mm }) => ({
	top: `calc(100% + ${mm(1)})`,
	background: classicDividerTextColor,
	color: "#fdf8e3",
	"@media screen": {
		"&:hover": {
			background: alpha(classicDividerTextColor, 0.5),
		},
	},
});

export const getMenuSx: PrintSxCallback = ({ mm }) => ({
	position: "absolute",
	flexDirection: "column",
	top: mm(17),
	left: mm(6),
	opacity: percent(50),
});
