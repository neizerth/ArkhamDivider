import { alpha } from "@mui/material";
import type { PrintSxCallback } from "@/modules/print/shared/model";
import type { SarnetskyDividerSxCallback } from "../../../model";

export const getSx: SarnetskyDividerSxCallback = ({ mm, objects: O }) => ({
	fontFamily: "Arno Pro, serif",
	fontWeight: "bold",
	fontStyle: "italic",
	fontSize: mm(O.subtitle.fontSize),
	lineHeight: O.subtitle.lineHeight,
	textAlign: "center",
});

export const getOutlineSx: PrintSxCallback = ({ mm }) => ({
	borderWidth: mm(0.3),
	top: mm(-1),
	bottom: mm(-1),
	borderRadius: mm(1),
});

const titleColor = "#2e2622";

export const getClearSx: PrintSxCallback = ({ mm }) => ({
	top: mm(5),
	background: titleColor,
	color: "#fdf8e3",
	"@media screen": {
		"&:hover": {
			background: alpha(titleColor, 0.5),
		},
	},
});
