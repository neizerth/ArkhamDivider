import type { PrintSxCallback } from "@/modules/print/shared/model";
import type { VintageDividerLocaleSxCallback } from "../../../model";

export const getSx: VintageDividerLocaleSxCallback = ({ mm, objects: O }) => ({
	default: {
		color: O.textColor,
		fontFamily: "Atlantic Cruise Extended, Arkhamic, Teutonic, serif",
		fontSize: mm(O.topTitle.default.fontSize),
		textAlign: "center",
	},
	ru: {
		fontFamily: "Breamcatcher, Conkordia, serif",
	},
	cn: {
		fontFamily: "ZhenShuai, serif",
	},
	ko: {
		fontFamily: "Line Seed, serif",
	},
});

export const getOutlineSx: PrintSxCallback = ({ mm }) => ({
	borderRadius: mm(1),
	borderColor: "#f2d7b0",
	top: mm(-0.1),
	bottom: mm(-0.1),
	left: mm(-0.2),
	right: mm(-0.2),
});
