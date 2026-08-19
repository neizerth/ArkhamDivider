import type { PrintSxCallback } from "@/modules/print/shared/model";
import type { Side } from "@/shared/model";

export const containerSx: PrintSxCallback = () => ({
	position: "absolute",
	zIndex: 2,
	left: 0,
	top: 0,
	width: "100%",
	height: "100%",
	opacity: 0,
	backgroundColor: "rgba(0, 0, 0, 0.7)",
	"@media screen": {
		":hover": {
			opacity: 1,
		},
	},
});

export const getMenuSx: PrintSxCallback = ({ mm }) => ({
	color: "white",
	position: "absolute",
	zIndex: 2,
	left: mm(1),
	top: "50%",
	transform: "translateY(-50%) scale(0.5)",
	transformOrigin: "left center",
	width: "100%",
	height: "100%",
});

export const backgroundImageSx: PrintSxCallback<{ side: Side }> = ({
	side,
}) => ({
	filter: side === "back" ? "grayscale(1)" : "none",
});

export const frameSx: PrintSxCallback = () => ({
	position: "absolute",
	inset: 0,
});

export const frameBackgroundSx: PrintSxCallback = () => ({
	position: "absolute",
	inset: 0,
});
