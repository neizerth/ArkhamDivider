import { alpha } from "@mui/material/styles";
import type { Faction } from "@/modules/faction/shared/model";
import { percent } from "@/shared/util";
import { invocation2018DividerTextColor } from "../../config/common";
import type {
	Invocation2018DividerLocaleCallback,
	Invocation2018DividerSxCallback,
} from "../../model";

export const getTextSx: Invocation2018DividerLocaleCallback = ({
	mm,
	objects: O,
}) => ({
	default: {
		fontSize: mm(5),
		fontFamily: "Arkhamic, Teutonic, serif",
		textAlign: "center",
		position: "absolute",
		top: mm(O.text.default.top),
		height: mm(O.text.default.height),
		left: mm(O.text.default.left),
		right: mm(O.text.default.right),
		color: invocation2018DividerTextColor,
	},
	ru: {
		fontSize: mm(O.text.ru.fontSize),
		height: mm(O.text.ru.height),
		fontFamily: "Conkordia, Arkhamic, Teutonic, serif",
	},
	cn: {
		fontFamily: "FZLiBian, Arkhamic, Teutonic, serif",
	},
	ko: {
		fontFamily: "SanCn, Arkhamic, Teutonic, serif",
	},
});

export const getOutlineSx: Invocation2018DividerSxCallback = ({ mm }) => ({
	borderWidth: mm(0.3),
	borderRadius: mm(1),
	top: mm(0.2),
	bottom: mm(0.5),
});

export const getIconSx: Invocation2018DividerSxCallback = ({
	mm,
	objects: O,
}) => ({
	position: "absolute",
	zIndex: 4,
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	cursor: "pointer",
	width: mm(O.icon.size),
	height: mm(O.icon.size),
	top: mm(O.icon.top),
	right: mm(O.icon.right),
	fontSize: mm(O.icon.fontSize),
	"@media screen": {
		":hover": {
			opacity: percent(70),
		},
	},
});

export const getIconTriggerSx: Invocation2018DividerSxCallback = ({
	mm,
	objects: O,
}) => ({
	position: "absolute",
	zIndex: 3,
	cursor: "pointer",
	width: mm(O.icon.size),
	height: mm(O.icon.size),
	top: mm(O.icon.top),
	right: mm(O.icon.right),
	borderRadius: "50%",
	"@media screen": {
		":hover": {
			opacity: percent(70),
			background: alpha("#fff", 0.1),
		},
	},
});

export const getIconBackgroundSx: Invocation2018DividerSxCallback = ({
	mm,
	objects: O,
	orientation,
}) => ({
	position: "absolute",
	zIndex: 3,
	width: mm(8),
	height: mm(8),
	top: orientation === "vertical" ? mm(2) : mm(1.9),
	right: mm(O.icon.right + 0.1),
});

const strokeClipSize = 11.3;

export const getStrokeSx: Invocation2018DividerSxCallback = (props) => {
	const { mm } = props;

	return {
		position: "absolute",
		color: "transparent",
		clipPath: `polygon(0 0, ${mm(strokeClipSize)} 0, ${mm(strokeClipSize)} 100%, 0 100%)`,
		WebkitTextStroke: `${mm(0.4)} #8e7a5c`,
		zIndex: -1,
	};
};

export const getTitleClearSx: Invocation2018DividerSxCallback = ({ mm }) => ({
	top: `calc(100% + ${mm(1)})`,
	background: invocation2018DividerTextColor,
	color: "#fdf8e3",
	"@media screen": {
		"&:hover": {
			background: alpha(invocation2018DividerTextColor, 0.5),
		},
	},
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

export const getMenuSx: Invocation2018DividerSxCallback = ({
	mm,
	orientation,
	faction,
}) => ({
	position: "absolute",
	zIndex: 1,
	flexDirection: "column",
	top: orientation === "horizontal" ? mm(22) : mm(32),
	left: mm(6),
	color: getFactionMenuColor(faction),
	filter: "drop-shadow(2px 2px 5px #000)",
});

export const getXPSx: Invocation2018DividerSxCallback = ({
	mm,
	objects: O,
}) => ({
	position: "absolute",
	zIndex: 2,
	fontSize: mm(O.xp.container.fontSize),
	top: mm(O.xp.container.top),
	right: mm(O.xp.container.right),
});

export const getNumericXPSx: Invocation2018DividerSxCallback = ({
	mm,
	objects: O,
}) => ({
	position: "absolute",
	zIndex: 3,
	fontSize: mm(O.xp.side.fontSize),
	height: mm(O.xp.side.height),
	top: mm(O.xp.side.top),
	right: mm(O.xp.side.right),
	paddingInline: mm(O.xp.side.paddingInline),
	fontFamily: "Arkhamic, Teutonic, serif",
});
