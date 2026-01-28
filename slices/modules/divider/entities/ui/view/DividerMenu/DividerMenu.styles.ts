import type { PrintSxCallback } from "@/modules/print/shared/model";

export const getSx: PrintSxCallback = () => ({
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
});

export const getButtonSx: PrintSxCallback = ({ mm }) => ({
	fontSize: mm(6),
	width: mm(11),
	height: mm(11),
});
