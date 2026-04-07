import type { PrintSxCallback } from "@/modules/print/shared/model";

export const getSx: PrintSxCallback = () => ({
	mixBlendMode: "color",
	opacity: 1,
	zIndex: 1,
});
