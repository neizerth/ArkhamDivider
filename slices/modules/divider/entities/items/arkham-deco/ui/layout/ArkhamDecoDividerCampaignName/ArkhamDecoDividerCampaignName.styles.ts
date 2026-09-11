import { alpha } from "@mui/material/styles";
import type {
	ArkhamDecoDividerLocaleSxCallback,
	ArkhamDecoDividerSxCallback,
} from "../../../model";

const textColor = "#2e2622";

export const getSx: ArkhamDecoDividerLocaleSxCallback = ({
	mm,
	objects: O,
}) => ({
	default: {
		fontSize: mm(O.campaignName.default.fontSize),
		fontFamily: "Arkhamic, Teutonic, serif",
		textAlign: "center",
		position: "absolute",
		top: mm(O.campaignName.default.top),
		height: mm(O.campaignName.default.height),
		left: mm(O.campaignName.default.left),
		right: mm(O.campaignName.default.right),
		color: textColor,
		zIndex: 5,
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

export const getOutlineSx: ArkhamDecoDividerSxCallback = ({ mm }) => ({
	borderWidth: mm(0.3),
	borderRadius: mm(1),
	top: mm(0.2),
	bottom: mm(0.1),
	left: mm(-1),
	right: mm(-1),
});

export const getClearSx: ArkhamDecoDividerSxCallback = ({ mm }) => ({
	top: `calc(100% + ${mm(1)})`,
	background: textColor,
	color: "#fdf8e3",
	"@media screen": {
		"&:hover": {
			background: alpha(textColor, 0.5),
		},
	},
});
