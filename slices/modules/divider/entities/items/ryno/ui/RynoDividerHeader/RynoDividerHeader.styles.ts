import { alpha } from "@mui/material";
import type { DividerType } from "@/modules/divider/shared/model";
import type { PrintSxCallback } from "@/modules/print/shared/model";
import { getRynoDividerTitleObject } from "../../lib";
import type {
	RynoDividerLocaleSxCallback,
	RynoDividerSxCallback,
} from "../../model";

export const getSubtitleSx: RynoDividerLocaleSxCallback = ({
	mm,
	objects: O,
}) => {
	return {
		default: {
			position: "absolute",
			top: mm(O.subtitle.top),
			left: mm(O.subtitle.left),
			right: mm(O.subtitle.right),
			height: mm(O.subtitle.height),
			fontFamily: "AGaramondPro, Arno Pro, serif",
			fontWeight: 700,
			fontSize: mm(O.subtitle.fontSize),
			lineHeight: 1,
			zIndex: 3,
			color: "#fff",
		},
	};
};

export const getTitleSx: RynoDividerLocaleSxCallback<{
	showSubtitle: boolean;
	type: DividerType;
}> = (options) => {
	const { mm } = options;
	const T = getRynoDividerTitleObject(options);

	return {
		default: {
			position: "absolute",
			fontFamily: "Arkhamic, Teutonic, serif",
			top: mm(T.top),
			left: mm(T.left),
			right: mm(T.right),
			height: mm(T.height),
			fontSize: mm(T.fontSize),
			lineHeight: 1,
			zIndex: 3,

			color: "#fff",
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

const titleColor = "#000";

const clearSx = {
	color: "#fdf8e3",
	border: `1px solid rgba(255, 255, 255, 0.8)`,
	"@media screen": {
		"&:hover": {
			background: alpha(titleColor, 0.5),
		},
	},
};

export const getClearSx: RynoDividerSxCallback = ({ mm }) => ({
	top: `calc(100% + ${mm(1)})`,
	background: titleColor,
	...clearSx,
});

export const getOutlineSx: PrintSxCallback = ({ mm }) => ({
	position: "absolute",
	top: mm(-1),
	left: mm(-1),
	right: mm(-1),
	bottom: mm(-0.5),
	borderRadius: mm(1),
	borderColor: "#fff",
	zIndex: 3,
});
