import { alpha } from "@mui/material/styles";
import type { PrintSxCallback } from "@/modules/print/shared/model";

const textColor = "#2e2622";

export const getRowSx: PrintSxCallback = ({ mm }) => ({
	cursor: "pointer",
	padding: mm(0.7),
	fontFamily: "ArnoPro, serif",
	fontSize: mm(3),
	gap: mm(0.8),
	alignItems: "center",
	justifyContent: "center",
	lineHeight: 1,
	":hover": {
		opacity: 0.5,
	},
});

export const getIconSx: PrintSxCallback = ({ mm }) => ({
	fontSize: mm(3),
});

export const getTextSx: PrintSxCallback = () => ({
	fontFamily: "ArnoPro, serif",
});

export const getTotalIconSx: PrintSxCallback = ({ mm }) => ({
	position: "relative",
	top: mm(-0.1),
});

export const getClearSx: PrintSxCallback = ({ mm }) => ({
	left: "auto",
	right: "100%",
	top: "50%",
	transform: "translate(-50%, -50%)",
	marginRight: mm(0.5),
	padding: mm(0.5),
	background: textColor,
	color: "#fdf8e3",
	"@media screen": {
		"&:hover": {
			background: alpha(textColor, 0.5),
		},
	},
});
