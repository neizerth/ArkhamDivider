import type { PrintSxCallback } from "@/modules/print/shared/model";

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
