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

export const getBackgroundIconSx: BinderBookmarkSxCallback = ({
	mm,
	faction,
}) => ({
	position: "absolute",
	left: "50%",
	top: `calc(50% + ${mm(4)})`,
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
	left: mm(1.6),
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
	right: mm(1.5),
	height: mm(8),
	cursor: "pointer",
});

export const getImageIconSx: BinderBookmarkSxCallback = ({ mm, faction }) => {
	const factionIconSx: Record<Faction, SxProps> = {
		neutral: {},
		multiclass: {},
		guardian: {
			width: mm(6.5),
			top: mm(3.1),
			right: mm(2.1),
		},
		rogue: {
			top: mm(3.1),
			right: mm(1.7),
		},
		seeker: {
			top: mm(3),
			right: mm(1.9),
			width: mm(6.8),
		},
		mystic: {
			top: mm(3.1),
			right: mm(1.8),
		},
		survivor: {
			top: mm(4.1),
			right: mm(1.3),
			width: mm(8),
		},
	};

	return {
		position: "absolute",
		zIndex: 4,
		top: mm(2.6),
		right: mm(0.4),
		width: mm(7),
		...factionIconSx[faction],
		cursor: "pointer",
		"@media screen": {
			":hover": {
				opacity: percent(50),
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
			opacity: percent(50),
		},
	},
});

export const getXpCostBackgroundSx: BinderBookmarkSxCallback = ({ mm }) => ({
	position: "absolute",
	zIndex: 1,
	top: mm(2.5),
	right: mm(1.5),
	height: mm(9),
});

export const getXpCostSx: BinderBookmarkSxCallback = ({ mm }) => ({
	position: "absolute",
	zIndex: 2,
	top: mm(9.9),
	right: mm(2.7),
	fontSize: mm(1.5),
});

const getFactionMenuColor = (faction: Faction = "neutral") => {
	const palette = {
		mystic: "#8d7aa6",
		seeker: "#e8b426",
		survivor: "#c7705f",
		guardian: "#1970bc",
		rogue: "#349334",
		neutral: "#cab686",
		multiclass: "#e1c985",
	};
	return palette[faction];
};

export const getMenuSx: BinderBookmarkSxCallback = ({ mm, faction }) => ({
	position: "absolute",
	top: "50%",
	left: mm(2),
	transform: "translateY(-50%)",
	zIndex: 4,
	color: getFactionMenuColor(faction),
	filter: "drop-shadow(2px 2px 5px #000)",
});
