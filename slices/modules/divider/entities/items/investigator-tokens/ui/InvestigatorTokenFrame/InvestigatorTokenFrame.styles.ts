import type { PrintSxCallback } from "@/modules/print/shared/model";
import { investigatorTokenObjects as O } from "../../config";

const F = O.frame;

export const imageSx: PrintSxCallback = () => ({
	position: "absolute",
	zIndex: 2,
	width: "125%",
	height: "125%",
	left: "50%",
	top: "50%",
	transform: "translate(-50%, -50%)",
	objectFit: "cover",
});

export const imageContainerSx: PrintSxCallback = ({ mm }) => ({
	position: "absolute",
	inset: mm(O.frame.width),
	borderRadius: "50%",
	overflow: "hidden",
});

export const factionImageSx: PrintSxCallback = () => ({
	position: "absolute",
	width: "100%",
	height: "100%",
	borderRadius: "50%",
});

export const factionBorderSx: PrintSxCallback = () => ({
	position: "absolute",
	backgroundImage: `linear-gradient(-40deg, rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.1))`,
	inset: 0,
	// inset: mm(O.frame.borderWidth),
	borderRadius: "50%",
});

export const outerBorderSx: PrintSxCallback = ({ mm }) => ({
	position: "absolute",
	inset: mm(O.frame.borderWidth),
});

export const innerBorderSx: PrintSxCallback = ({ mm }) => ({
	position: "absolute",
	inset: mm(O.frame.borderWidth),
});

export const frameSx: PrintSxCallback = ({ mm }) => ({
	position: "absolute",
	zIndex: 1,
	width: `calc(100% + ${mm(F.borderWidth * 2)})`,
	height: `calc(100% + ${mm(F.borderWidth * 2)})`,
	left: `${mm(-F.borderWidth)}`,
	top: `${mm(-F.borderWidth)}`,
	borderRadius: "50%",
});

export const factionIconSx: PrintSxCallback = ({ mm }) => ({
	position: "relative",
	zIndex: 3,
	fontSize: mm(2),
	top: 0,
	left: 0,
	height: mm(3),
});

export const uniqueIconSx: PrintSxCallback = ({ mm }) => ({
	position: "relative",
	zIndex: 3,
	fontSize: mm(1.5),
	top: 0,
	left: 0,
	color: "#c8a427",
	textShadow: `0 0 ${mm(2)} rgba(0, 0, 0, 0.3)`,
	height: mm(3),
});

export const getFactionIconContainerSx: PrintSxCallback = () => ({
	position: "absolute",
	width: "100%",
	height: "100%",
	display: "flex",
	justifyContent: "center",
	top: 0,
	left: 0,
});
