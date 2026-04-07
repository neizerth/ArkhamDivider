import type { PrintSxCallback } from "@/modules/print/shared/model";

export const getSx: PrintSxCallback = ({ mm }) => ({
	position: "absolute",
	bottom: mm(5),
	left: mm(7),
	width: mm(4),
	height: mm(4),
	zIndex: 5,
});
