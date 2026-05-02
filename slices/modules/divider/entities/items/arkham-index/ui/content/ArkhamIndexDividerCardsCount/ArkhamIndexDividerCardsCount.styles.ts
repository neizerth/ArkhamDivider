import type { PrintSxCallback } from "@/modules/print/shared/model";
import { percent } from "@/shared/util";
import type { ArkhamIndexDividerSxCallback } from "../../../model";

export const getCardsCountSx: PrintSxCallback = () => ({
	fontFamily: "ArnoPro, serif",
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
