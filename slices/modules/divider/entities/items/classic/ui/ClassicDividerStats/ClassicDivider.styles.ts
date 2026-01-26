import type { PrintSxCallback } from "@/modules/print/shared/model";

export const getSx: PrintSxCallback = ({ mm }) => ({
	padding: mm(0.7),
	fontFamily: "ArnoPro",
	fontSize: mm(3),
	alignItems: "center",
	justifyContent: "center",
	lineHeight: 1,
});

export const getTextSx: PrintSxCallback = () => ({
	fontFamily: "ArnoPro",
});
