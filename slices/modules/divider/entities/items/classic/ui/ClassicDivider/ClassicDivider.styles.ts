import { alpha } from "@mui/material/styles";
import { percent } from "@/shared/util";
import { classicDividerTextColor } from "../../config/common";
import type {
	ClassicDividerCallbackProps,
	ClassicDividerLocaleCallback,
	ClassicDividerSxCallback,
} from "../../model";

export const getTextSx: ClassicDividerLocaleCallback = ({
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
		color: classicDividerTextColor,
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

export const getOutlineSx: ClassicDividerSxCallback = ({ mm }) => ({
	borderWidth: mm(0.3),
	borderRadius: mm(1),
	top: mm(0.2),
	bottom: mm(0.5),
});

export const getIconSx: ClassicDividerSxCallback = ({
	mm,
	iconObject: icon,
}) => ({
	position: "absolute",
	zIndex: 3,
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	cursor: "pointer",
	width: mm(icon.width),
	height: mm(icon.height),
	top: mm(icon.top),
	right: mm(icon.right),
	fontSize: mm(icon.fontSize),
	"@media screen": {
		":hover": {
			opacity: percent(70),
		},
	},
});

export const getBackgroundIconSx: ClassicDividerSxCallback = ({
	mm,
	objects: O,
}) => ({
	position: "absolute",
	cursor: "pointer",
	width: mm(50),
	height: mm(50),
	top: mm(O.backgroundIcon.top),
	left: mm(O.backgroundIcon.left),
	fontSize: mm(O.backgroundIcon.fontSize),
	opacity: O.backgroundIcon.opacity,
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	"@media screen": {
		":hover": {
			opacity: percent(3),
		},
	},
});

export const getDividerStatsSx: ClassicDividerSxCallback = ({ mm }) => ({
	position: "absolute",
	bottom: mm(6.7),
	right: mm(2.5),
});

const strokeClipSize = 11.3;
const getStrokeColor = ({ color, layoutId }: ClassicDividerCallbackProps) => {
	if (layoutId === "classic-horizontal-hq") {
		return "#b9a387";
	}

	return color ? "#cab686" : "#fff";
};

export const getStrokeSx: ClassicDividerSxCallback = (props) => {
	const { mm } = props;

	return {
		position: "absolute",
		color: "transparent",
		clipPath: `polygon(0 0, ${mm(strokeClipSize)} 0, ${mm(strokeClipSize)} 100%, 0 100%)`,
		WebkitTextStroke: `${mm(0.4)} ${getStrokeColor(props)}`,
		zIndex: -1,
	};
};

export const getDividerCardsSx: ClassicDividerSxCallback = ({ mm }) => ({
	position: "absolute",
	zIndex: 2,
	left: mm(17),
	right: mm(8),
	top: mm(18),
	bottom: mm(15),
});

export const getTitleClearSx: ClassicDividerSxCallback = ({ mm }) => ({
	top: `calc(100% + ${mm(1)})`,
	background: classicDividerTextColor,
	color: "#fdf8e3",
	"@media screen": {
		"&:hover": {
			background: alpha(classicDividerTextColor, 0.5),
		},
	},
});

export const getMenuSx: ClassicDividerSxCallback = ({ mm }) => ({
	position: "absolute",
	zIndex: 1,
	flexDirection: "column",
	top: mm(22),
	left: mm(6),
	opacity: percent(50),
});

export const getXPSx: ClassicDividerSxCallback = ({ mm, objects: O }) => ({
	position: "absolute",
	zIndex: 2,
	fontSize: mm(O.xp.container.fontSize),
	width: mm(O.xp.container.size),
	height: mm(O.xp.container.size),
	top: mm(O.xp.container.top),
	right: mm(O.xp.container.right),
});

export const getNumericXPSx: ClassicDividerSxCallback = ({
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
