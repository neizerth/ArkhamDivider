import type { PrintSxCallback } from "@/modules/print/shared/model";
import { percent } from "@/shared/util";
import type { ArkhamIndexDividerSxCallback } from "../../model";

export const getBackgroundSx: PrintSxCallback = () => ({
	position: "absolute",
	inset: 0,
	objectFit: "cover",
});

export const getBackgroundStrokeSx: PrintSxCallback = () => ({
	position: "absolute",
	inset: 0,
	objectFit: "cover",
	pointerEvents: "none",
});

export const getBodySx: ArkhamIndexDividerSxCallback = ({
	mm,
	objects: O,
}) => ({
	position: "absolute",
	top: mm(O.tab.height),
	left: 0,
	right: 0,
	bottom: 0,
});

export const getMediaContentSx: PrintSxCallback = () => ({
	position: "absolute",
	inset: 0,
});

export const getCampaignIconSx: ArkhamIndexDividerSxCallback = ({
	mm,
	objects: O,
}) => ({
	position: "absolute",
	fontSize: mm(O.campaignIcon.fontSize),
	bottom: mm(O.campaignIcon.bottom),
	right: mm(O.campaignIcon.right),
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
