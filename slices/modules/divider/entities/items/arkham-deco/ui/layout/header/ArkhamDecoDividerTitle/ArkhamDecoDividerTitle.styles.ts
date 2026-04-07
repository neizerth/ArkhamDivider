import { alpha } from "@mui/material/styles";
import { getArkhamDecoTitleObject } from "../../../../lib";
import type {
	ArkhamDecoDividerLocaleSxCallback,
	ArkhamDecoDividerSxCallback,
} from "../../../../model";

export const getTitleSx: ArkhamDecoDividerLocaleSxCallback = (options) => {
	const { mm } = options;
	const T = getArkhamDecoTitleObject(options);

	return {
		default: {
			fontSize: mm(T.fontSize),
			height: mm(T.height),
			fontFamily: "Arkhamic, Teutonic, serif",
			textAlign: T.textAlign,
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

export const getOutlineSx: ArkhamDecoDividerSxCallback = ({ mm }) => ({
	borderWidth: mm(0.3),
	borderRadius: mm(1),
	top: mm(0.2),
	bottom: mm(0.1),
	left: mm(-1),
	right: mm(-1),
});

const titleColor = "#2e2622";

export const getTitleClearSx: ArkhamDecoDividerSxCallback = (options) => {
	const { mm } = options;
	const T = getArkhamDecoTitleObject(options);
	return {
		position: "absolute",
		top: `calc(100% + ${mm(1.5)})`,
		left: `calc(50% + ${mm((T.right - T.left) / 2)})`,
		background: titleColor,
		color: "#fdf8e3",
		"@media screen": {
			"&:hover": {
				background: alpha(titleColor, 0.5),
			},
		},
	};
};
