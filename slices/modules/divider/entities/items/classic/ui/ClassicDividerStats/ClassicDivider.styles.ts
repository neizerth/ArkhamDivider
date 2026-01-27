import type { PrintSxCallback } from "@/modules/print/shared/model";

export const getSx: PrintSxCallback = ({ mm }) => ({
	cursor: "pointer",
	padding: mm(0.7),
	fontFamily: "ArnoPro, serif",
	fontSize: mm(3),
	alignItems: "center",
	justifyContent: "center",
	lineHeight: 1,
	":hover": {
		opacity: 0.5,
	},
});

export const getTextSx: PrintSxCallback = () => ({
	fontFamily: "ArnoPro, serif",
});
