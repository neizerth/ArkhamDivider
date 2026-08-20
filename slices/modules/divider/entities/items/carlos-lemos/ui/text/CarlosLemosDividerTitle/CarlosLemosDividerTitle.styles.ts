import { alpha } from "@mui/material";
import type { LocaleSxCallback } from "@/modules/core/i18n/shared/model";
import type { PrintSxCallback } from "@/modules/print/shared/model";
import { carlosLemosObjects as O } from "../../../config/objects";

export const getInputSx: LocaleSxCallback = ({ mm }) => ({
	default: {
		fontFamily: "Arkhamic, Teutonic, serif",
		fontSize: mm(O.title.fontSize),
		height: "100%",
	},
	ru: {
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
	top: mm(-1),
	bottom: mm(-1),
	left: mm(-1),
	right: mm(-1),
});

const titleColor = "#2e2622";

export const getTitleClearSx: PrintSxCallback = () => ({
	top: "100%",
	background: titleColor,
	color: "#fdf8e3",
	"@media screen": {
		"&:hover": {
			background: alpha(titleColor, 0.5),
		},
	},
});

export const getStrokeSx: PrintSxCallback = ({ mm }) => ({
	top: mm(1),
	bottom: mm(1),
	left: mm(-1),
	right: mm(-1),
});
