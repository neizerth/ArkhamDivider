import type { PrintSxCallback } from "@/modules/print/shared/model";
import { carlosLemosObjects as O } from "../../config/objects";

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

export const getIconContainerSx: PrintSxCallback<{ editable: boolean }> = ({
	mm,
	editable,
}) => ({
	position: "relative",
	height: mm(O.encounters.height),
	width: mm(O.encounters.height),
	cursor: editable ? "pointer" : "default",
	"&:hover": {
		opacity: editable ? 0.8 : 1,
	},
});

export const getIconSx: PrintSxCallback = ({ mm }) => ({
	position: "absolute",
	zIndex: 2,
	height: mm(O.encounterIcon.height),
	width: mm(O.encounterIcon.width),
	fontSize: mm(O.encounterIcon.fontSize),
	top: mm(O.encounterIcon.top),
	left: mm(O.encounterIcon.left),
});

export const getBackgroundSx: PrintSxCallback = ({ mm }) => ({
	position: "absolute",
	objectFit: "contain",
	left: 0,
	top: "1%",
	height: mm(O.encounters.height),
	width: mm(O.encounters.height),
	zIndex: 1,
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
