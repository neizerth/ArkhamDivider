import type { SxProps } from "@mui/material";
import type { Faction } from "@/modules/faction/shared/model";
import type { PrintSxCallback } from "@/modules/print/shared/model";
import { percent } from "@/shared/util";
import { binderBookmarkObjects as O } from "../../config";
import type { BinderBookmarkSxCallback } from "../../model";

export const getBackgroundSx: PrintSxCallback = ({ mm }) => ({
	position: "absolute",
	left: "50%",
	top: "50%",
	transform: "translate(-50%, -50%)",
	height: mm(336),
});

const factionWidth: Record<Faction, number> = {
	neutral: 50,
	multiclass: 50,
	guardian: 65,
	rogue: 65,
	seeker: 50,
	mystic: 65,
	survivor: 70,
};

export const getBackgroundIconSx: BinderBookmarkSxCallback = ({ faction }) => ({
	position: "absolute",
	left: "50%",
	top: "50%",
	transform: "translate(-50%, -50%)",
	width: `${factionWidth[faction]}%`,
});

export const getHeaderSx: BinderBookmarkSxCallback = ({ mm }) => ({
	position: "absolute",
	top: mm(1),
	left: mm(0),
	right: mm(0),
});

export const getTitleBackgroundSx: BinderBookmarkSxCallback = ({ mm }) => ({
	position: "absolute",
	zIndex: 1,
	top: mm(1.1),
	left: mm(1.1),
	height: mm(10),
});

export const getTitleSx: BinderBookmarkSxCallback = ({
	mm,
	titleObject: T,
}) => ({
	position: "absolute",
	zIndex: 2,
	top: mm(T.top),
	left: mm(T.left),
	right: mm(T.right),
	height: mm(T.height),
});

export const getTopIconBackgroundSx: BinderBookmarkSxCallback = ({ mm }) => ({
	position: "absolute",
	zIndex: 2,
	top: mm(2.4),
	right: mm(2.2),
	height: mm(8),
});

export const getImageIconSx: BinderBookmarkSxCallback = ({ mm, faction }) => {
	const factionIconSx: Record<Faction, SxProps> = {
		neutral: {},
		multiclass: {},
		guardian: {
			width: mm(6.5),
			top: mm(3.1),
			right: mm(2.8),
		},
		rogue: {
			top: mm(3.1),
			right: mm(2.4),
		},
		seeker: {
			top: mm(3),
			right: mm(2.5),
			width: mm(6.7),
		},
		mystic: {
			top: mm(3.1),
			right: mm(2.5),
		},
		survivor: {
			top: mm(4.1),
			right: mm(2),
			width: mm(8),
		},
	};

	return {
		position: "absolute",
		zIndex: 4,
		top: mm(2.6),
		right: mm(1.1),
		width: mm(7),
		...factionIconSx[faction],
		cursor: "pointer",
		"@media screen": {
			":hover": {
				opacity: percent(30),
			},
		},
	};
};

export const getIconSx: BinderBookmarkSxCallback = ({ mm }) => ({
	position: "absolute",
	zIndex: 4,
	top: mm(O.icon.top),
	right: mm(O.icon.right),
	width: mm(O.icon.width),
	height: mm(O.icon.height),
	fontSize: mm(O.icon.fontSize),
	cursor: "pointer",
	"@media screen": {
		":hover": {
			opacity: percent(30),
		},
	},
});

export const getXpCostBackgroundSx: BinderBookmarkSxCallback = ({ mm }) => ({
	position: "absolute",
	zIndex: 1,
	top: mm(2.5),
	right: mm(2),
	height: mm(9),
});

export const getXpCostSx: BinderBookmarkSxCallback = ({ mm }) => ({
	position: "absolute",
	zIndex: 2,
	top: mm(9.9),
	right: mm(3.2),
	fontSize: mm(1.5),
});
