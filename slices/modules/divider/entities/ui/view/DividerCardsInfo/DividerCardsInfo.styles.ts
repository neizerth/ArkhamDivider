import type { PrintSxCallback } from "@/modules/print/shared/model";

export const getSx: PrintSxCallback = ({ mm }) => ({
	fontFamily: "ArnoPro",
	backgroundColor: "rgba(0, 0, 0, 0.01)",
	boxShadow: `0 0 ${mm(1)} rgba(0, 0, 0, 0.05)`,
	fontSize: mm(3.5),
	padding: mm(2),
	borderRadius: mm(1),
	gap: mm(1),
});
