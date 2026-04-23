import { alpha } from "@mui/material";
import type { LocaleSxCallback } from "@/modules/core/i18n/shared/model";
import type { PrintSxCallback } from "@/modules/print/shared/model";
import { invocation2018DividerTextColor } from "../../../invocation2018/config/common";
import { binderBookmarkObjects as O } from "../../config/common";

export const getTextSx: LocaleSxCallback = ({ mm }) => ({
	default: {
		fontSize: mm(O.title.default.fontSize),
		fontFamily: "Arkhamic, Teutonic, serif",
		textAlign: "center",
		height: mm(O.title.default.height),
		color: invocation2018DividerTextColor,
	},
	ru: {
		fontSize: mm(O.title.ru.fontSize),
		top: mm(O.title.ru.top),
		fontFamily: "Conkordia, Arkhamic, Teutonic, serif",
	},
	cn: {
		fontFamily: "FZLiBian, Arkhamic, Teutonic, serif",
	},
	ko: {
		fontFamily: "SanCn, Arkhamic, Teutonic, serif",
	},
});

export const getOutlineSx: PrintSxCallback = ({ mm }) => ({
	borderWidth: mm(0.3),
	borderRadius: mm(1),
	top: mm(-0.3),
	bottom: mm(0.2),
});

export const getTitleClearSx: PrintSxCallback = ({ mm }) => ({
	top: `calc(100% + ${mm(1)})`,
	background: invocation2018DividerTextColor,
	color: "#fdf8e3",
	"@media screen": {
		"&:hover": {
			background: alpha(invocation2018DividerTextColor, 0.5),
		},
	},
});

export const getStrokeSx: PrintSxCallback = ({ mm }) => {
	const strokeClipSize = 11.3;

	return {
		position: "absolute",
		color: "transparent",
		textAlign: "center",
		clipPath: `polygon(0 0, ${mm(strokeClipSize)} 0, ${mm(strokeClipSize)} 100%, 0 100%)`,
		WebkitTextStroke: `${mm(0.4)} #8e7a5c`,
		zIndex: -1,
	};
};
