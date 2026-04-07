import { alpha } from "@mui/material";
import type { LocaleSxCallback } from "@/modules/core/i18n/shared/model";
import type { PrintSxCallback } from "@/modules/print/shared/model";
import type { ArkhamStarterDividerTitleObject as TitleObject } from "../../../model";

export const getSx: LocaleSxCallback<{ title: TitleObject }> = ({
	mm,
	title: T,
}) => ({
	default: {
		fontSize: mm(T.fontSize),
	},
});

export const getTitleSx: LocaleSxCallback<{ title: TitleObject }> = ({
	mm,
	title: T,
}) => ({
	default: {
		position: "absolute",
		top: mm(T.top),
		left: mm(T.left),
		right: mm(T.right),
		height: mm(T.height),
	},
});

export const getOutlineSx: PrintSxCallback = ({ mm }) => ({
	borderWidth: mm(0.3),
	borderRadius: mm(1),
	top: mm(-0.1),
	bottom: mm(0.2),
});

const titleColor = "#2e2622";

export const getTitleClearSx: PrintSxCallback = ({ mm }) => ({
	top: `calc(100% + ${mm(1)})`,
	background: titleColor,
	color: "#fdf8e3",
	"@media screen": {
		"&:hover": {
			background: alpha(titleColor, 0.5),
		},
	},
});

export const getInputSx: LocaleSxCallback = () => ({
	default: {
		fontFamily: "Arkhamic, Teutonic, serif",
	},
	ru: { fontFamily: "Conkordia, Arkhamic, Teutonic, serif" },
	cn: { fontFamily: "FZLiBian, Arkhamic, Teutonic, serif" },
	ko: { fontFamily: "SanCn, Arkhamic, Teutonic, serif" },
});
