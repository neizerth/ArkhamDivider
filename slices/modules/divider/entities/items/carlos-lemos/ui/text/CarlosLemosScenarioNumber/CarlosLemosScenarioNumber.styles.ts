import type { PrintSxCallback } from "@/modules/print/shared/model";

export const getInputSx: PrintSxCallback = () => ({
	fontFamily: "Arkhamic, Teutonic, serif",
	textAlign: "center",
	whiteSpace: "nowrap",
	height: "100%",
	width: "100%",
});
