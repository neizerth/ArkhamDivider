import { alpha } from "@mui/material";
import type { LocaleSxCallback } from "@/modules/core/i18n/shared/model";
import type { PrintSxCallback } from "@/modules/print/shared/model";
import { percent } from "@/shared/util";
import { arkhamStarterLayoutObjects as O } from "../../../config";
import type { ArkhamStarterDividerTitleObject as TitleObject } from "../../../model";

export const getTitleSx: LocaleSxCallback<{ title: typeof O.title }> = ({
	mm,
	title: T,
}) => ({
	default: {
		position: "absolute",
		top: mm(T.top),
		left: mm(T.left),
		right: mm(T.right),
		height: mm(T.height),
	},
});

export const getStoryTitleSx: LocaleSxCallback = ({ mm }) => ({
	default: {
		position: "absolute",
		top: mm(O.storyTitle.top),
		right: mm(O.storyTitle.right),
		width: mm(O.storyTitle.width),
		height: mm(O.storyTitle.height),
		color: "#fff",
		textAlign: "left",
		zIndex: 1,
	},
});

const storyStrokeColor = "#352e1f";

export const getStoryStrokeSx: PrintSxCallback = ({ mm }) => ({
	position: "absolute",
	top: 0,
	left: 0,
	width: mm(18),
	height: mm(2.7),
	WebkitTextStroke: `${mm(0.3)} ${storyStrokeColor}`,
	paintOrder: "stroke fill",
	color: storyStrokeColor,
});

export const getOutlineSx: PrintSxCallback = ({ mm }) => ({
	borderWidth: mm(0.3),
	borderRadius: mm(1),
	top: mm(-0.1),
	bottom: mm(0.2),
});

const titleColor = "#2e2622";

export const getTitleClearSx: PrintSxCallback = ({ mm }) => ({
	top: `calc(100% + ${mm(1)})`,
	background: titleColor,
	color: "#fdf8e3",
	"@media screen": {
		"&:hover": {
			background: alpha(titleColor, 0.5),
		},
	},
});

export const getCornerIconSx: PrintSxCallback = ({ mm }) => ({
	position: "absolute",
	top: mm(O.cornerIcon.top),
	left: mm(O.cornerIcon.left),
	fontSize: mm(O.cornerIcon.fontSize),
	width: mm(O.cornerIcon.width),
	height: mm(O.cornerIcon.height),
	cursor: "pointer",
	"@media screen": {
		":hover": {
			opacity: percent(70),
		},
	},
});

export const getStripSx: PrintSxCallback = ({ mm }) => ({
	position: "absolute",
	zIndex: -1,
	right: mm(-3.5),
	width: mm(27),
});

export const getPlayerCornerSx: PrintSxCallback = ({ mm }) => ({
	position: "absolute",
	top: mm(-3.5),
	left: mm(-3.5),
	width: mm(20.5),
	cursor: "pointer",
	zIndex: 1,
	"@media screen": {
		":hover": {
			opacity: percent(70),
		},
	},
});

export const getPlayerIconSx: PrintSxCallback<{ title: TitleObject }> = ({
	mm,
	title: T,
}) => ({
	position: "absolute",
	zIndex: 1,
	top: mm(O.storyIcon.top),
	left: mm(T.playerIconLeft),
	fontSize: mm(O.storyIcon.fontSize),
	width: mm(O.storyIcon.width),
	height: mm(O.storyIcon.height),
	cursor: "pointer",
});

export const getXPSx: PrintSxCallback = ({ mm }) => ({
	position: "absolute",
	zIndex: 1,
	top: mm(O.xp.top),
	right: mm(O.xp.right),
	fontSize: mm(O.xp.fontSize),
	height: mm(O.xp.height),
	fontFamily: "Arkhamic, Teutonic, serif",
});
