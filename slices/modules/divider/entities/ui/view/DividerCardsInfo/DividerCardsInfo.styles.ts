import type { PrintSxCallback } from "@/modules/print/shared/model";

export const getSx: PrintSxCallback = ({ mm }) => ({
	fontFamily: "ArnoPro",
	backgroundColor: "rgba(255, 255, 255, 0.3)",
	fontSize: mm(3.5),
	padding: mm(2),
	borderRadius: mm(1),
	gap: 0,
});
