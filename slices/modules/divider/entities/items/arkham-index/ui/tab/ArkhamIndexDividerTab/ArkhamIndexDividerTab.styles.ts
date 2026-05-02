import type { Faction } from "@/modules/faction/shared/model";
import { percent } from "@/shared/util";
import { getArkhamIndexDividerTabTitleObject } from "../../../lib";
import type {
	ArkhamIndexDividerLayoutObjects,
	ArkhamIndexDividerSxCallback,
} from "../../../model";

type Options = {
	iconLeft: number;
	showIcon: boolean;
	tabWidth: number;
	tabLeft: number;
};

type SxCallback<T = void> = ArkhamIndexDividerSxCallback<Options & T>;

export const getIconSx: SxCallback = ({ mm, objects: O, iconLeft: left }) => ({
	position: "absolute",
	zIndex: 5,
	fontSize: mm(O.icon.fontSize),
	left: mm(left),
	top: mm(O.icon.top),
	width: mm(O.icon.width),
	height: mm(O.icon.height),
	cursor: "pointer",
	"@media screen": {
		":hover": {
			opacity: percent(70),
		},
	},
});

export const getBackgroundSx: SxCallback = ({
	mm,
	iconLeft: left,
	objects: O,
	showIcon,
}) => {
	const size = O.iconBackground.width;
	return {
		position: "absolute",
		zIndex: 4,
		width: mm(size),
		height: mm(size),
		top: mm(O.iconBackground.top),
		left: mm(left + O.iconBackground.left),
		cursor: "pointer",
		opacity: showIcon ? 1 : 0.3,
		"@media screen": {
			":hover": {
				opacity: percent(70),
			},
		},
	};
};

export const getSideBackgroundSx: SxCallback = ({
	mm,
	iconLeft: left,
	objects: O,
}) => {
	const size = O.sideBackground.width;
	const offset = {
		x: O.sideBackground.left,
		y: O.sideBackground.top,
	};
	return {
		position: "absolute",
		width: mm(size),
		height: mm(size),
		top: mm(offset.y),
		left: mm(left + offset.x),
	};
};

export const getSideTextSx: SxCallback<
	Options & { sideObject: ArkhamIndexDividerLayoutObjects["sideText"] }
> = ({ mm, iconLeft: left, sideObject: S }) => {
	return {
		position: "absolute",
		fontFamily: "Arkhamic, Teutonic, serif",
		fontSize: mm(S.fontSize),
		top: mm(S.top),
		left: mm(left + S.left),
		width: mm(S.width),
		height: mm(S.height),
		textAlign: "center",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	};
};

export const getTitleSx: SxCallback<Options & { showSideText: boolean }> = (
	options,
) => {
	const { mm, tabWidth, tabLeft } = options;
	const T = getArkhamIndexDividerTabTitleObject(options);
	const width = tabWidth - T.right;
	const left = tabLeft + T.left;

	return {
		position: "absolute",
		fontSize: mm(T.fontSize),
		top: mm(T.top),
		left: mm(left),
		width: mm(width),
		height: mm(T.height),
	};
};

export const getShiftSx: SxCallback<{
	position: "left" | "right";
}> = ({ mm, position }) => ({
	position: "absolute",
	zIndex: 4,
	top: mm(1),
	[position]: mm(-2),
	fontSize: mm(4),
	WebkitTextStroke: `${mm(0.1)} white`,
	color: "#ede3ce",
	cursor: "pointer",
	transform: position === "left" ? "rotate(180deg)" : "none",
});

export const getTabSx: SxCallback = ({ mm }) => {
	return {
		position: "absolute",
		top: mm(4),
		fontSize: mm(3),
		color: "white",
	};
};

export const getEnlargeSx: SxCallback = ({ mm }) => ({
	position: "absolute",
	top: mm(5.5),
	right: mm(-2.5),
	fontSize: mm(3),
	color: "#ede3ce",
	WebkitTextStroke: `${mm(0.1)} white`,
	transform: "rotate(45deg)",
	cursor: "pointer",
});

export const getShrinkSx: SxCallback<{ isFull: boolean }> = ({
	mm,
	isFull,
}) => ({
	position: "absolute",
	zIndex: 4,
	top: isFull ? mm(9) : mm(5.5),
	left: isFull ? mm(8) : mm(-2.5),
	fontSize: mm(3),
	color: "#ede3ce",
	WebkitTextStroke: `${mm(0.1)} white`,
	transform: "rotate(45deg)",
	cursor: "pointer",
});

export const getIncreaseIndentSx: SxCallback = ({ mm }) => ({
	position: "absolute",
	top: mm(1),
	right: mm(-0.5),
	fontSize: mm(3),
	color: "#ede3ce",
	WebkitTextStroke: `${mm(0.1)} white`,
	cursor: "pointer",
});

export const getDecreaseIndentSx: SxCallback = ({ mm }) => ({
	position: "absolute",
	top: mm(5.5),
	left: mm(-8.5),
	fontSize: mm(3),
	color: "#ede3ce",
	WebkitTextStroke: `${mm(0.1)} white`,
	cursor: "pointer",
});

const factionPosition: Record<
	Faction,
	{ top: number; left: number; width: number; height: number }
> = {
	neutral: { top: 1.1, left: 1.3, width: 7.3, height: 7.5 },
	guardian: { top: 1.2, left: 1.3, width: 7.5, height: 7.5 },
	seeker: { top: 1.2, left: 1.3, width: 7.6, height: 7.5 },
	rogue: { top: 0.9, left: 1.2, width: 7.7, height: 7.5 },
	mystic: { top: 1.1, left: 1.3, width: 7.5, height: 7.5 },
	survivor: { top: 1.6, left: 1.3, width: 7.45, height: 7.5 },
	multiclass: { top: 1.1, left: 1.3, width: 7.5, height: 7.5 },
};

export const getFactionImageSx: SxCallback = ({ mm, iconLeft, faction }) => {
	const F = factionPosition[faction];
	return {
		position: "absolute",
		top: mm(F.top),
		left: mm(iconLeft + F.left),
		height: mm(F.height),
		width: mm(F.width),
		zIndex: 4,
		cursor: "pointer",
		objectFit: "contain",
		"@media screen": {
			":hover": {
				opacity: percent(30),
			},
		},
	};
};

export const getFullSizeSx: SxCallback = ({ mm }) => ({
	position: "absolute",
	zIndex: 4,
	top: mm(3.5),
	right: mm(5.8),
	fontSize: mm(3),
	color: "#ede3ce",
	WebkitTextStroke: `${mm(0.1)} white`,
	cursor: "pointer",
	"@media screen": {
		":hover": {
			opacity: percent(30),
		},
	},
});
