import { alpha } from "@mui/material/styles";
import type { LocaleSxCallback } from "@/modules/core/i18n/shared/model";
import type { PrintSxCallback } from "@/modules/print/shared/model";
import { percent } from "@/shared/util";
import { classicDividerObjects as O } from "../../config";
import { classicDividerTextColor } from "../../config/common";

export const getTextSx: LocaleSxCallback = ({ mm }) => ({
	default: {
		fontSize: mm(5),
		fontFamily: "Arkhamic, Teutonic, serif",
		textAlign: "center",
		position: "absolute",
		top: mm(O.text.default.top),
		height: mm(O.text.default.height),
		left: mm(O.text.default.left),
		right: mm(O.text.default.right),
	},
	ru: {
		top: mm(O.text.ru.top),
		fontSize: mm(O.text.ru.fontSize),
		height: mm(O.text.ru.height),
		fontFamily: "Conkordia, Arkhamic, Teutonic, serif",
	},
});

export const getOutlineSx: LocaleSxCallback = ({ mm }) => ({
	default: {
		borderWidth: mm(0.3),
		borderRadius: mm(1),
		top: mm(-1),
		bottom: mm(2),
	},
});

export const getIconSx: PrintSxCallback = ({ mm }) => ({
	position: "absolute",
	zIndex: 3,
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	cursor: "pointer",
	width: mm(O.icon.size),
	height: mm(O.icon.size),
	"@media screen": {
		":hover": {
			opacity: percent(70),
		},
	},
});

export const getBackgroundIconSx: PrintSxCallback = ({ mm }) => ({
	position: "absolute",
	cursor: "pointer",
	width: mm(50),
	height: mm(50),
	opacity: O.backgroundIcon.opacity,
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
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

const strokeClipSize = 8.5;

export const getStrokeSx: PrintSxCallback = ({ mm }) => ({
	position: "absolute",
	color: "transparent",
	clipPath: `polygon(0 0, ${mm(strokeClipSize)} 0, ${mm(strokeClipSize)} 100%, 0 100%)`,
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
	zIndex: 1,
	flexDirection: "column",
	top: mm(20),
	left: mm(6),
	opacity: percent(50),
});

export const getXPSx: PrintSxCallback = ({ mm }) => ({
	position: "absolute",
	zIndex: 2,
	fontSize: mm(O.xp.container.fontSize),
	width: mm(O.xp.container.size),
	height: mm(O.xp.container.size),
	top: mm(O.xp.container.top),
	right: mm(O.xp.container.right),
});

export const getNumericXPSx: PrintSxCallback = ({ mm }) => ({
	position: "absolute",
	zIndex: 3,
	fontSize: mm(O.xp.side.fontSize),
	height: mm(O.xp.side.height),
	top: mm(O.xp.side.top),
	right: mm(O.xp.side.right),
	paddingInline: mm(O.xp.side.paddingInline),
	fontFamily: "Arkhamic, Teutonic, serif",
});
