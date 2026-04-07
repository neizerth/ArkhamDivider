import { compact } from "ramda-adjunct";
import type { PrintSxCallback } from "@/modules/print/shared/model";
import { percent } from "@/shared/util";
import { getSideXPObject } from "../../../../lib";
import type {
	ArkhamDecoDividerSxCallback,
	ArkhamDecoPosition,
} from "../../../../model";

export const getLeftHorizontalCornerSx: PrintSxCallback = ({ mm }) => ({
	position: "absolute",
	top: mm(-2),
	left: 0,
	width: mm(14),
	mixBlendMode: "multiply",
});

export const getLeftTabCornerSx: ArkhamDecoDividerSxCallback = ({
	mm,
	objects: O,
}) => ({
	position: "absolute",
	top: mm(O.header.height),
	left: 0,
	width: mm(12.3),
	mixBlendMode: "multiply",
});

export const getRightHorizontalScenarioCornerSx: PrintSxCallback = ({
	mm,
}) => ({
	position: "absolute",
	top: mm(-2),
	right: 0,
	width: mm(12.8),
	zIndex: 2,
});

export const getRightTabCornerSx: ArkhamDecoDividerSxCallback = ({
	mm,
	objects: O,
}) => ({
	position: "absolute",
	top: mm(O.header.height),
	right: 0,
	transform: "scaleX(-1)",
	width: mm(12.3),
});

export const getStoryLineSx: ArkhamDecoDividerSxCallback<{
	position: ArkhamDecoPosition;
}> = ({ mm, position, objects: O }) => {
	const transforms = compact([position === "right" && "scaleX(-1)"]);
	const L = O.line.default;

	return {
		position: "absolute",
		top: mm(O.header.height - L.offsetTop),
		[position]: mm(L.sidePosition),
		height: mm(2.6),
		transform: transforms.join(" "),
		clipPath: `inset(0 ${mm(L.crop.right)} 0 ${mm(L.crop.left)})`,
		zIndex: 3,
	};
};

export const getStoryLineTentacleSx: ArkhamDecoDividerSxCallback<{
	position: ArkhamDecoPosition;
}> = ({ mm, position, objects: O }) => ({
	position: "absolute",
	top: mm(O.header.height - O.line.tentacles.offsetTop),
	[position]: `calc(50% - ${mm(8.5)})`,
	width: mm(6),
	...(position === "right" ? { transform: "scaleX(-1)" } : {}),
	zIndex: 3,
});

const noIconLineCropMm = {
	left: 11.1,
	right: 10.3,
};

export const getNoIconLineSx: ArkhamDecoDividerSxCallback = ({
	mm,
	objects: O,
}) => ({
	position: "absolute",
	left: mm(O.line.noIcon.offsetLeft - 1),
	top: mm(O.header.height - O.line.noIcon.offsetTop),
	width: mm(94.4),
	clipPath: `inset(0 ${mm(noIconLineCropMm.right - O.line.noIcon.offsetLeft)} 0 ${mm(noIconLineCropMm.left - O.line.noIcon.offsetLeft)})`,
	zIndex: 3,
});

export const getLeftIconSx: ArkhamDecoDividerSxCallback = ({
	mm,
	objects: O,
}) => ({
	position: "absolute",
	top: mm(O.leftIcon.offsetTop),
	left: mm(O.header.left),
	fontSize: mm(O.leftIcon.fontSize),
	width: mm(O.leftIcon.width),
	height: mm(O.leftIcon.height),
	zIndex: 5,
	cursor: "pointer",
	"@media screen": {
		":hover": {
			opacity: percent(70),
		},
	},
});

export const getRightIconSx: ArkhamDecoDividerSxCallback = ({
	mm,
	objects: O,
}) => ({
	position: "absolute",
	top: 0,
	right: 0,
	fontSize: mm(2.9),
	width: mm(8),
	height: mm(O.header.height),
	zIndex: 5,
	cursor: "pointer",
	"@media screen": {
		":hover": {
			opacity: percent(70),
		},
	},
});

export const getCenterIconSx: ArkhamDecoDividerSxCallback = ({
	mm,
	objects: O,
}) => ({
	position: "absolute",
	top: mm(O.header.height - O.centralIcon.offsetTop),
	left: "50%",
	transform: "translateX(-50%)",
	fontSize: mm(O.centralIcon.fontSize),
	zIndex: 5,
	cursor: "pointer",
	"@media screen": {
		":hover": {
			opacity: percent(70),
		},
	},
});

export const getScenarioCornerSx: ArkhamDecoDividerSxCallback = ({
	mm,
	objects: O,
}) => ({
	position: "absolute",
	right: mm(O.scenarioCorner.right),
	top: mm(O.scenarioCorner.top),
	zIndex: 1,
});

export const getScenarioBackgroundSx: PrintSxCallback = ({ mm }) => ({
	position: "absolute",
	top: mm(-1),
	left: mm(-6.9),
	width: mm(16),
	zIndex: 1,
});

export const getScenarioNumberSx: ArkhamDecoDividerSxCallback = ({
	mm,
	objects: O,
}) => ({
	fontFamily: "Arkhamic, Teutonic, serif",
	lineHeight: 1,
	position: "relative",
	zIndex: 5,
	height: mm(O.scenarioNumber.height),
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	paddingInline: mm(1.5),
	minWidth: mm(5),
	fontSize: mm(O.scenarioNumber.fontSize),
});

export const getScenarioNumberIconSx: ArkhamDecoDividerSxCallback = ({
	mm,
	objects: O,
}) => ({
	position: "absolute",
	top: 0,
	left: 0,
	width: mm(8),
	height: mm(O.header.height),
	zIndex: 2,
});

export const getXpCostSx: ArkhamDecoDividerSxCallback = ({
	mm,
	objects: O,
}) => ({
	position: "absolute",
	fontFamily: "Arkhamic, Teutonic, serif",
	textAlign: "center",
	top: 0,
	right: mm(O.header.right),
	fontSize: mm(O.xpCost.fontSize),
	width: mm(8),
	height: mm(O.header.height),
	zIndex: 3,
});

export const getSideXPSx: ArkhamDecoDividerSxCallback<{
	numericXP?: boolean;
}> = ({ mm, objects: O, numericXP }) => {
	const X = getSideXPObject({ objects: O, numericXP });
	return {
		position: "absolute",
		top: mm(X.top),
		right: mm(X.right),
		fontSize: mm(X.fontSize),
		zIndex: 3,
	};
};

const tabLineBorderWidth = 0.25;

const tabLineBorderColor = "rgba(0, 0, 0, 0.5)";

export const getTabLineSx: ArkhamDecoDividerSxCallback = ({
	mm,
	objects: O,
}) => ({
	position: "absolute",
	top: mm(-tabLineBorderWidth),
	left: mm(O.header.left),
	right: mm(O.header.right),
	height: mm(4 + tabLineBorderWidth),
	border: `${mm(tabLineBorderWidth)} solid ${tabLineBorderColor}`,
	borderBottom: "none",
	"&::before": {
		content: '""',
		position: "absolute",
		bottom: 0,
		left: mm(-O.header.left),
		width: mm(O.header.left),
		borderBottom: `${mm(tabLineBorderWidth)} solid ${tabLineBorderColor}`,
	},
	"&::after": {
		content: '""',
		position: "absolute",
		bottom: 0,
		right: mm(-O.header.right),
		width: mm(O.header.right),
		borderBottom: `${mm(tabLineBorderWidth)} solid ${tabLineBorderColor}`,
	},
});
