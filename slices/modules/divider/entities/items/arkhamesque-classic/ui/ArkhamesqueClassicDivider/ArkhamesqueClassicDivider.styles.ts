import type { PrintSxCallback } from "@/modules/print/shared/model";
import { percent } from "@/shared/util";
import { arkhamesqueClassicObjects as O } from "../../config";

export const getBackgroundSx: PrintSxCallback = () => ({
	position: "absolute",
	left: 0,
	top: 0,
	width: "100%",
});

export const getLeftIconSx: PrintSxCallback = ({ mm }) => ({
	position: "absolute",
	display: "flex",
	left: mm(O.icon.left),
	top: mm(O.icon.top),
	fontSize: mm(O.icon.fontSize),
	width: mm(O.icon.width),
	height: mm(O.icon.height),
	justifyContent: "center",
	alignItems: "center",
	cursor: "pointer",
	// backgroundColor: "red",
	"@media screen": {
		":hover": {
			opacity: percent(70),
		},
	},
});

export const getBottomIconSx: PrintSxCallback = ({ mm }) => ({
	position: "absolute",
	top: mm(O.bottomIcon.top),
	height: mm(O.bottomIcon.height),
	left: mm(O.bottomIcon.left),
	right: mm(O.bottomIcon.right),
	transform: "translateX(-50%)",
	fontSize: mm(O.bottomIcon.fontSize),
	cursor: "pointer",
	"@media screen": {
		":hover": {
			opacity: percent(70),
		},
	},
});

export const getBottomIconContainerSx: PrintSxCallback = () => ({
	position: "absolute",
	left: "50%",
	transform: "translateX(-50%)",
});

export const getTitleSx: PrintSxCallback = ({ mm }) => ({
	position: "absolute",
	top: mm(O.title.top),
	left: mm(O.title.left),
	right: mm(O.title.right),
	height: mm(O.title.height),
});

export const getXPSx: PrintSxCallback = ({ mm }) => ({
	position: "absolute",
	top: mm(O.xp.top),
	right: mm(O.xp.right),
	width: mm(O.xp.width),
	height: mm(O.xp.height),
	whiteSpace: "nowrap",
	textAlign: "center",
});

export const getScenarioNumberSx: PrintSxCallback = ({ mm }) => ({
	position: "absolute",
	top: mm(O.scenarioNumber.top),
	right: mm(O.scenarioNumber.right),
	width: mm(O.scenarioNumber.width),
	height: mm(O.scenarioNumber.height),
	whiteSpace: "nowrap",
	textAlign: "center",
});

export const getMenuSx: PrintSxCallback = ({ mm }) => ({
	position: "absolute",
	bottom: mm(3),
	left: mm(2),
});
