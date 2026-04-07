import type { PrintSxCallback } from "@/modules/print/shared/model";

export const getColorSx: PrintSxCallback = () => ({
	position: "absolute",
	top: "-75%",
	left: "-31%",
	width: "100%",
	height: "150%",
	mixBlendMode: "multiply",
	transform: "rotate(45deg)",
	clipPath: "polygon(0% 0%, 100% 0%, 94% 85%, 0% 87%)",
});
