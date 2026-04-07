import type { PrintSxCallback } from "@/modules/print/shared/model";
import { percent } from "@/shared/util";
import { chapter2Objects as O } from "../../config/common";

export const getIconSx: PrintSxCallback = ({ mm }) => ({
	position: "absolute",
	zIndex: 3,
	width: mm(O.icon.width),
	height: mm(O.icon.height),
	top: mm(O.icon.top),
	left: mm(O.icon.left),
	fontSize: mm(O.icon.fontSize),
	cursor: "pointer",
	"@media screen": {
		":hover": {
			opacity: percent(70),
		},
	},
});

export const getBackgroundSx: PrintSxCallback = ({ mm }) => ({
	position: "absolute",
	zIndex: 1,
	width: mm(O.background.width),
	height: mm(O.background.height),
	top: mm(O.background.top),
	left: mm(O.background.left),
	fontSize: mm(O.background.fontSize),
	opacity: O.background.opacity,
	cursor: "pointer",
	"@media screen": {
		":hover": {
			opacity: O.background.opacity * 0.7,
		},
	},
});

export const getOverlaySx: PrintSxCallback = () => ({
	position: "absolute",
	mixBlendMode: "color",
	zIndex: 2,
	inset: 0,
});

export const getColorPickerSx: PrintSxCallback = ({ mm }) => ({
	position: "absolute",
	zIndex: 4,
	width: mm(4),
	height: mm(4),
	bottom: mm(10),
	left: mm(6),
});

export const getMenuSx: PrintSxCallback = ({ mm }) => ({
	position: "absolute",
	zIndex: 4,
	opacity: 0.5,
	bottom: mm(19),
	left: mm(6),
});
