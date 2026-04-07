import type { PrintSxCallback } from "@/modules/print/shared/model";
import type { BoxRect } from "@/shared/model";
import { percent } from "@/shared/util";
import type {
	VintageDividerLocaleSxCallback,
	VintageDividerSxCallback,
} from "../../model";

export const getTitleSx: VintageDividerLocaleSxCallback = ({
	mm,
	objects: O,
}) => ({
	default: {
		position: "absolute",
		zIndex: 3,
		top: mm(O.title.default.top),
		left: mm(O.title.default.left),
		right: mm(O.title.default.right),
		height: mm(O.title.default.height),
	},
});

export const getTopTitleSx: VintageDividerLocaleSxCallback = ({
	mm,
	objects: O,
}) => ({
	default: {
		position: "absolute",
		zIndex: 3,
		top: mm(O.topTitle.default.top),
		left: mm(O.topTitle.default.left),
		right: mm(O.topTitle.default.right),
		height: mm(O.topTitle.default.height),
	},
});

export const getMenuSx: PrintSxCallback = ({ mm }) => ({
	position: "absolute",
	zIndex: 3,
	top: mm(20),
	left: mm(0),
});

export const getBodySx: PrintSxCallback = () => ({
	position: "absolute",
	zIndex: 1,
	left: 0,
	right: 0,
	bottom: 0,
});

export const getTabImageSx: VintageDividerSxCallback<{
	position: Partial<BoxRect>;
	bleedEnabled?: boolean;
}> = ({ mm, position: P, bleedEnabled }) => ({
	position: "absolute",
	top: P.top && mm(P.top),
	width: P.width && mm(P.width),
	left: P.left && mm(P.left),
	right: P.right && mm(P.right),
	clipPath: bleedEnabled ? "" : `inset(0 ${mm(3)} 0 ${mm(3)})`,
});

export const getTabColorSx = () => ({
	position: "absolute",
	top: 0,
	left: 0,
	right: 0,
	bottom: 0,
	mixBlendMode: "color",
});

export const getTabSx: VintageDividerSxCallback<{
	tabIndex: number;
}> = ({ mm, tabIndex, objects: O }) => ({
	position: "absolute",
	top: 0,
	left: mm(O.tab.width * tabIndex),
	width: mm(O.tab.width),
	height: mm(10.5),
});

export const getBleedViewSx: PrintSxCallback<{ bleedEnabled?: boolean }> = ({
	bleedEnabled,
}) => ({
	backgroundColor: bleedEnabled ? "#151616" : "transparent",
});

export const getColorPickerSx: PrintSxCallback = ({ mm }) => ({
	position: "absolute",
	zIndex: 3,
	top: mm(57),
	left: mm(3.5),
	width: mm(4),
	height: mm(4),
});

export const getIconSx: VintageDividerSxCallback<{ tabIndex: number }> = ({
	mm,
	tabIndex,
	objects: O,
}) => ({
	position: "absolute",
	zIndex: 3,
	top: mm(O.icon.top),
	left: mm(O.icon.left + O.tab.width * tabIndex),
	width: mm(O.icon.width),
	height: mm(O.icon.height),
	fontSize: mm(O.icon.fontSize),
	cursor: "pointer",
	"@media screen": {
		":hover": {
			opacity: percent(70),
		},
	},
});

export const getBodyCornerRadiusSx: VintageDividerSxCallback = ({
	mm,
	objects: O,
}) => ({
	position: "absolute",
	zIndex: 2,
	left: mm(-0.25),
	right: mm(-0.25),
	bottom: mm(-0.25),
	border: `${mm(0.25)} dashed red`,
	borderTop: "none",
	top: mm(O.tab.height),
	borderRadius: `0 0 ${mm(3)} ${mm(3)}`,
});
