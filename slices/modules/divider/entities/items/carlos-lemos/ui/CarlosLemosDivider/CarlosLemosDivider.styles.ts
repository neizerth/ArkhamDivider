import type { PrintSxCallback } from "@/modules/print/shared/model";
import { carlosLemosObjects as O } from "../../config/objects";

export const getColorSx: PrintSxCallback<{ maskSrc: string }> = ({
	maskSrc,
}) => ({
	position: "absolute",
	inset: 0,
	zIndex: 1,
	mixBlendMode: "color",
	maskImage: `url("${maskSrc}")`,
	WebkitMaskImage: `url("${maskSrc}")`,
	maskSize: "100% 100%",
	WebkitMaskSize: "100% 100%",
	maskRepeat: "no-repeat",
	WebkitMaskRepeat: "no-repeat",
	maskMode: "alpha",
});

export const getBackgroundColorSx: PrintSxCallback = ({ mm }) => ({
	position: "absolute",
	zIndex: 2,
	bottom: mm(12),
	left: mm(9),
	width: mm(4),
	height: mm(4),
});

export const getTitleSx: PrintSxCallback = ({ mm }) => {
	return {
		position: "absolute",
		top: mm(O.title.top),
		left: mm(O.title.left),
		right: mm(O.title.right),
		height: mm(O.title.height),
		fontSize: mm(O.title.fontSize),
		zIndex: 2,
	};
};

export const getIconSx: PrintSxCallback = ({ mm }) => {
	return {
		position: "absolute",
		top: mm(O.icon.top),
		right: mm(O.icon.right),
		height: mm(O.icon.height),
		width: mm(O.icon.width),
		fontSize: mm(O.icon.fontSize),
		zIndex: 2,
		cursor: "pointer",
		"&:hover": {
			opacity: 0.8,
		},
	};
};

export const getScenarioNumberSx: PrintSxCallback = ({ mm }) => {
	return {
		position: "absolute",
		top: mm(O.scenarioNumber.top),
		right: mm(O.scenarioNumber.right),
		width: mm(O.scenarioNumber.width),
		height: mm(O.scenarioNumber.height),
		fontSize: mm(O.scenarioNumber.fontSize),
		textAlign: "center",
		lineHeight: 1.1,
		whiteSpace: "nowrap",
		zIndex: 2,
	};
};

export const getCampaignTitleSx: PrintSxCallback = ({ mm }) => {
	return {
		position: "absolute",
		fontFamily: "ArnoPro",
		textAlign: "center",
		fontWeight: 700,
		top: mm(O.campaignTitle.top),
		left: mm(O.campaignTitle.left),
		right: mm(O.campaignTitle.right),
		height: mm(O.campaignTitle.height),
		fontSize: mm(O.campaignTitle.fontSize),
	};
};

export const getEncounterIconsSx: PrintSxCallback = ({ mm }) => {
	return {
		position: "absolute",
		top: mm(O.encounters.top),
		left: mm(O.encounters.left),
		right: mm(O.encounters.right),
		height: mm(O.encounters.height),
	};
};

export const getMenuSx: PrintSxCallback = ({ mm }) => {
	return {
		position: "absolute",
		zIndex: 2,
		top: mm(43),
		left: mm(8),
	};
};
