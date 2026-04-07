import type { PrintSxCallback } from "@/modules/print/shared/model";
import type {
	TCGDividerStickerLocaleSxCallback,
	TCGDividerStickerSxCallback,
} from "../../model";

export const getIconSx: TCGDividerStickerSxCallback = ({ mm, objects: O }) => ({
	position: "absolute",
	left: mm(O.icon.left),
	top: mm(O.icon.top),
	bottom: mm(O.icon.bottom),
	width: mm(O.icon.width),
	fontSize: mm(O.icon.fontSize),
	cursor: "pointer",
	"&:hover": {
		opacity: 0.5,
	},
});

export const getContentSx: PrintSxCallback = () => ({
	borderBottomLeftRadius: 0,
	borderBottomRightRadius: 0,
});

export const getTitleSx: TCGDividerStickerLocaleSxCallback = ({
	mm,
	objects,
}) => {
	const T = objects.title;
	return {
		default: {
			fontFamily: "Arkhamic, Teutonic, serif",
			position: "absolute",
			top: mm(T.top),
			bottom: mm(T.bottom),
			left: mm(T.left),
			right: mm(T.right),
			fontSize: mm(T.fontSize),
		},
		ru: {
			fontFamily: "Conkordia, Arkhamic, Teutonic, serif",
		},
		cn: {
			fontFamily: "FZLiBian, Arkhamic, Teutonic, serif",
		},
		ko: {
			fontFamily: "SanCn, Arkhamic, Teutonic, serif",
		},
	};
};

export const getClearSx: TCGDividerStickerSxCallback = ({
	mm,
	objects: O,
}) => ({
	position: "absolute",
	zIndex: 4,
	left: "auto",
	right: mm(O.clear.right),
	width: mm(3.5),
	height: mm(3.5),
	top: `calc(50% + ${mm(O.clear.top)})`,
	transform: "translateY(-50%)",
});

export const getOutlineSx: PrintSxCallback = ({ mm }) => ({
	position: "absolute",
	borderWidth: mm(0.3),
	borderRadius: mm(1),
	left: mm(-1),
	right: mm(-1),
	top: mm(0.1),
	bottom: mm(0.1),
});

export const getXPCostSx: TCGDividerStickerSxCallback = ({
	mm,
	objects: O,
}) => ({
	position: "absolute",
	display: "flex",
	alignItems: "center",
	lineHeight: 1,
	top: 0,
	right: mm(O.xp.right),
	bottom: mm(0),
	fontSize: mm(O.xp.fontSize),
	fontFamily: "Arkhamic, Teutonic, serif",
	letterSpacing: mm(0.1),
	width: mm(O.xp.width),
});

export const getSideIconSx: TCGDividerStickerSxCallback = ({ mm, objects }) => {
	const SI = objects.sideIcon;
	return {
		position: "absolute",
		right: mm(SI.right),
		top: mm(SI.top),
		bottom: mm(SI.bottom),
		width: mm(SI.width),
		fontSize: mm(SI.fontSize),
		cursor: "pointer",
		"&:hover": {
			opacity: 0.5,
		},
	};
};

export const getMenuSx: TCGDividerStickerSxCallback = ({ mm, objects }) => {
	const M = objects.menu;
	return {
		position: "absolute",
		justifyContent: "center",
		alignItems: "center",
		zIndex: 4,
		right: mm(M.right),
		top: mm(M.top),
		bottom: mm(M.bottom),
		transform: `scale(${M.zoom})`,
		transformOrigin: "center right",
		opacity: 0.2,
		backgroundColor: "white",
		"&:hover": {
			opacity: 1,
		},
	};
};

export const getScenarioSx: TCGDividerStickerSxCallback = ({ mm, objects }) => {
	const S = objects.scenario;
	return {
		position: "absolute",
		display: "flex",
		alignItems: "center",
		right: mm(S.right),
		top: mm(S.top),
		bottom: mm(S.bottom),
		width: mm(S.width),
		fontSize: mm(S.fontSize),
		fontFamily: "Arkhamic, Teutonic, serif",
	};
};
