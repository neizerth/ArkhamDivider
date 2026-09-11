import { alpha } from "@mui/material/styles";
import { classicDividerTextColor } from "../../config/common";
import type {
	ClassicDividerLocaleCallback,
	ClassicDividerSxCallback,
} from "../../model";

export const getSx: ClassicDividerLocaleCallback = ({ mm, objects: O }) => ({
	default: {
		fontSize: mm(O.campaignName.default.fontSize),
		fontFamily: "Arkhamic, Teutonic, serif",
		textAlign: "center",
		position: "absolute",
		bottom: mm(O.campaignName.default.bottom),
		height: mm(O.campaignName.default.height),
		left: mm(O.campaignName.default.left),
		right: mm(O.campaignName.default.right),
		color: classicDividerTextColor,
		zIndex: 3,
	},
	ru: {
		fontSize: mm(O.campaignName.ru.fontSize),
		height: mm(O.campaignName.ru.height),
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

export const getClearSx: ClassicDividerSxCallback = ({ mm }) => ({
	top: `calc(100% + ${mm(1)})`,
	background: classicDividerTextColor,
	color: "#fdf8e3",
	"@media screen": {
		"&:hover": {
			background: alpha(classicDividerTextColor, 0.5),
		},
	},
});
