import type { PrintSxCallback } from "@/modules/print/shared/model";

export const getContainerSx: PrintSxCallback = () => ({
	position: "relative",
	justifyContent: "center",
	width: "100%",
	height: "100%",
});

export const getIconRowContentSx: PrintSxCallback = () => ({
	position: "relative",
	display: "inline-flex",
	justifyContent: "center",
	alignItems: "center",
	height: "100%",
});

export const getIconContainerSx: PrintSxCallback = ({ mm }) => ({
	position: "relative",
	height: mm(9),
	width: mm(9),
	cursor: "pointer",
	"&:hover": {
		opacity: 0.8,
	},
});

export const getIconSx: PrintSxCallback = ({ mm }) => ({
	position: "absolute",
	zIndex: 2,
	height: mm(7.2),
	width: mm(7.5),
	fontSize: mm(7.6),
	top: mm(0.9),
	left: mm(0.8),
});

export const getBackgroundSx: PrintSxCallback = ({ mm }) => ({
	position: "absolute",
	objectFit: "contain",
	left: 0,
	top: "1%",
	height: mm(9),
	width: mm(9),
	zIndex: 1,
	// width: mm(1),
	// height: mm(1),
});

export const getAddIconSx: PrintSxCallback = ({ mm }) => ({
	position: "absolute",
	zIndex: 2,
	height: "100%",
	width: mm(6.8),
	top: 0,
	left: "100%",
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	fontSize: mm(4.5),
	cursor: "pointer",
	"&:hover": {
		opacity: 0.5,
	},
});
