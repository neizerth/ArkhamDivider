import { alpha } from "@mui/material/styles";
import type {
	SarnetskyDividerLocaleCallback,
	SarnetskyDividerSxCallback,
} from "../../../model";

export const getTitleSx: SarnetskyDividerLocaleCallback = ({
	mm,
	objects: O,
}) => ({
	default: {
		height: "100%",
		fontSize: mm(O.title.default.fontSize),
		fontFamily: "Arkhamic, Teutonic, serif",
		textAlign: "center",
		whiteSpace: "nowrap",
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
});

export const getOutlineSx: SarnetskyDividerSxCallback = ({ mm }) => ({
	borderWidth: mm(0.3),
	borderRadius: mm(1),
	top: mm(-0.1),
	bottom: mm(0.2),
});

const titleColor = "#2e2622";

export const getTitleClearSx: SarnetskyDividerSxCallback = ({ mm }) => ({
	top: `calc(100% + ${mm(1)})`,
	background: titleColor,
	color: "#fdf8e3",
	"@media screen": {
		"&:hover": {
			background: alpha(titleColor, 0.5),
		},
	},
});
