import type { PrintSxCallback } from "@/modules/print/shared/model";

export const getSx: PrintSxCallback = ({ mm }) => ({
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	gap: mm(2),
});

export const getButtonSx: PrintSxCallback = ({ mm }) => ({
	fontSize: mm(7),
	width: mm(12),
	height: mm(12),
});
