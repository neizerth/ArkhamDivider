import type { PrintSxCallback } from "@/modules/print/shared/model";

export const getColorSx: PrintSxCallback = () => ({
	position: "absolute",
	inset: 0,
	zIndex: 1,
	mixBlendMode: "color",
});
