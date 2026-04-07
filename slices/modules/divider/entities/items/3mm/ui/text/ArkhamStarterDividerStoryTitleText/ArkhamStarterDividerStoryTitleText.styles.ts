import { alpha } from "@mui/material";
import type { LocaleSxCallback } from "@/modules/core/i18n/shared/model";
import type { PrintSxCallback } from "@/modules/print/shared/model";
import { arkhamStarterLayoutObjects as O } from "../../../config";

const storyStrokeColor = "#352e1f";

export const getStoryStrokeSx: PrintSxCallback = ({ mm }) => ({
	// position: "absolute",
	// top: 0,
	// left: 0,

	WebkitTextStroke: `${mm(0.3)} ${storyStrokeColor}`,
	paintOrder: "stroke fill",
	color: storyStrokeColor,
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

export const getSx: LocaleSxCallback = ({ mm }) => ({
	default: {
		fontFamily: "Arkhamic, Teutonic, serif",
		fontSize: mm(O.storyTitle.fontSize),
		color: "#fff",
	},
	ru: { fontFamily: "Conkordia, Arkhamic, Teutonic, serif" },
	cn: { fontFamily: "FZLiBian, Arkhamic, Teutonic, serif" },
	ko: { fontFamily: "SanCn, Arkhamic, Teutonic, serif" },
});
