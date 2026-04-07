import { alpha } from "@mui/material";
import type {
	SarnetskyBandLocaleSxCallback,
	SarnetskyBandSxCallback,
} from "../../model";

export const getInputSx: SarnetskyBandLocaleSxCallback = () => ({
	default: {
		fontFamily: "Arkhamic, Teutonic, serif",
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

export const getOutlineSx: SarnetskyBandSxCallback = ({ mm }) => ({
	borderWidth: mm(0.3),
	borderRadius: mm(1),
	top: mm(1),
	bottom: mm(1),
	left: mm(-1),
	right: mm(-1),
});

const titleColor = "#2e2622";

export const getTitleClearSx: SarnetskyBandSxCallback = () => ({
	top: "100%",
	background: titleColor,
	color: "#fdf8e3",
	"@media screen": {
		"&:hover": {
			background: alpha(titleColor, 0.5),
		},
	},
});
