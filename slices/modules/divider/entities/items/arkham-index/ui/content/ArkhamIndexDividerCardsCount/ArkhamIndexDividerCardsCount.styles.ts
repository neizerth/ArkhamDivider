import type { PrintSxCallback } from "@/modules/print/shared/model";
import { percent } from "@/shared/util";
import type { ArkhamIndexDividerSxCallback } from "../../../model";

export const getContainerSx: PrintSxCallback = () => ({
	alignItems: "center",
});

export const getCardsCountSx: PrintSxCallback = ({ mm }) => ({
	fontFamily: "ArnoPro, serif",
	gap: mm(0.5),
});

export const getCampaignIconSx: ArkhamIndexDividerSxCallback = ({
	mm,
	objects: O,
}) => ({
	fontSize: mm(O.campaignIcon.fontSize),
	width: mm(O.campaignIcon.width),
	height: mm(O.campaignIcon.height),
	color: "white",
	cursor: "pointer",
	"@media screen": {
		":hover": {
			opacity: percent(70),
		},
	},
});

export const getContentSx: ArkhamIndexDividerSxCallback = ({
	mm,
	backSideShift,
}) => ({
	alignItems: "center",
	gap: mm(1.5),
	paddingRight: backSideShift ? mm(3) : 0,
});

export const getArrowSx: ArkhamIndexDividerSxCallback = ({
	backSideShift,
}) => ({
	fontSize: "0.7em",
	transform: backSideShift ? "rotate(180deg)" : "rotate(0deg)",
});
