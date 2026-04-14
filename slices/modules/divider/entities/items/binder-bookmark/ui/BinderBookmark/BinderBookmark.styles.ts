import type { PrintSxCallback } from "@/modules/print/shared/model";

export const getBackgroundSx: PrintSxCallback = ({ mm }) => ({
	position: "absolute",
	left: "50%",
	top: "50%",
	transform: "translate(-50%, -50%)",
	height: mm(336),
});
