import type { LocaleSxCallback } from "@/modules/core/i18n/shared/model";
import type { PrintSxCallback } from "@/modules/print/shared/model";
import { tcgDividerStickerObjects as O } from "../../config/common";
import {
	getTCGDividerStickerSideIconObject,
	getTCGDividerStickerTitleObject,
} from "../../lib";

export const getIconSx: PrintSxCallback = ({ mm }) => ({
	position: "absolute",
	left: mm(O.icon.left),
	top: mm(O.icon.top),
	width: mm(O.icon.width),
	height: mm(O.icon.height),
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

export const getTitleSx: LocaleSxCallback<{ withXP: boolean }> = ({
	mm,
	withXP,
}) => {
	const T = getTCGDividerStickerTitleObject(withXP);
	return {
		default: {
			fontFamily: "Arkhamic, Teutonic, serif",
			position: "absolute",
			top: mm(T.top),
			bottom: mm(T.bottom),
			height: mm(T.height),
			left: mm(T.left),
			right: mm(T.right),
			fontSize: mm(T.fontSize),
		},
		ru: {
			fontSize: mm(T.fontSize),
			height: mm(T.height),
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

export const getClearSx: PrintSxCallback = ({ mm }) => ({
	position: "absolute",
	left: "auto",
	right: mm(-1),
	width: mm(3),
	height: mm(3),
	top: mm(1.5),
});

export const getOutlineSx: PrintSxCallback = ({ mm }) => ({
	position: "absolute",
	borderWidth: mm(0.3),
	borderRadius: mm(1),
	left: mm(-1),
	right: mm(-1),
	top: 0,
	bottom: 0,
});

export const getXPCostSx: PrintSxCallback = ({ mm }) => ({
	position: "absolute",
	display: "flex",
	alignItems: "center",
	lineHeight: 1,
	top: 0,
	right: mm(2),
	bottom: mm(0),
	fontSize: mm(5),
	fontFamily: "Arkhamic, Teutonic, serif",
	letterSpacing: mm(0.1),
	width: mm(10),
});

export const getSideIconSx: PrintSxCallback<{ withXP: boolean }> = ({
	mm,
	withXP,
}) => {
	const I = getTCGDividerStickerSideIconObject(withXP);
	return {
		position: "absolute",
		right: mm(I.right),
		top: mm(I.top),
		width: mm(I.width),
		height: mm(I.height),
		fontSize: mm(I.fontSize),
		cursor: "pointer",
		"&:hover": {
			opacity: 0.5,
		},
	};
};

export const getMenuSx: PrintSxCallback<{
	isPlayer?: boolean;
	withXP?: boolean;
}> = ({ mm, isPlayer, withXP }) => ({
	position: "absolute",
	zIndex: 4,
	right: mm(isPlayer && withXP ? 40 : 3),
	top: mm(1),
	bottom: mm(0.5),
	fontSize: mm(4),
	zoom: 0.5,
	backgroundColor: "white",
	opacity: 0.2,
	"&:hover": {
		opacity: 1,
	},
});
