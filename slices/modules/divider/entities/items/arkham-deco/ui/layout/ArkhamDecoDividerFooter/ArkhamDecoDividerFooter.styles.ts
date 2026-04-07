import type { PrintSxCallback } from "@/modules/print/shared/model";

type BottomCornerProps = {
	position: "left" | "right";
};

export const getBottomCornerSx: PrintSxCallback<BottomCornerProps> = ({
	position,
}) => ({
	position: "absolute",
	bottom: 0,
	[position]: 0,
	...(position === "right" ? { transform: "scaleX(-1)" } : {}),
	zIndex: 2,
});

export const getBottomCornerImageSx: PrintSxCallback = ({ mm }) => ({
	width: mm(9.4),
	height: mm(9.4),
	zIndex: 2,
});

export const getBottomTentacleSx: PrintSxCallback = ({ mm }) => ({
	position: "absolute",
	top: mm(-4),
	left: mm(-0.2),
	width: mm(4.7),
	transform: "rotate(70deg) scale(1.3)",
	clipPath: "polygon(0 0,100% 0,100% 20%,100% 95%,0% 90%,0% 50%)",
	zIndex: 2,
});

export const getBottomLineSx: PrintSxCallback = ({ mm }) => ({
	position: "absolute",
	bottom: mm(0.8),
	left: "50%",
	transform: "translateX(-50%)",
	width: mm(17.7),
	zIndex: 2,
});
