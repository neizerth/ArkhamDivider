import { ArkhamDecoDividerType } from "@/shared/data/layouts/arkham-deco";
import { DividerType, IDivider } from "@/shared/model/types/dividers";

export const STORY_DIVIDERS = [DividerType.ENCOUNTER, DividerType.SCENARIO];

export const getDefaultSpecialIcon = ({
	divider,
	layoutType,
}: {
	divider: IDivider;
	layoutType: ArkhamDecoDividerType;
}) => {
	const { type, campaignIcon, specialIcon } = divider;

	const isTab = layoutType === ArkhamDecoDividerType.TAB;
	const isPlayer = type === DividerType.PLAYER;
	const isInvestigator = type === DividerType.INVESTIGATOR;

	if (isTab && !isInvestigator) {
		return;
	}

	if (isPlayer) {
		return;
	}
	return campaignIcon || specialIcon;
};

export const getDefaultLineIcon = ({
	divider,
	layoutType,
}: {
	divider: IDivider;
	layoutType: ArkhamDecoDividerType;
}) => {
	const { type, campaignIcon, specialIcon } = divider;

	// if (type === DividerType.CAMPAIGN) {
	//   return;
	// }

	const isTab = layoutType === ArkhamDecoDividerType.TAB;
	const isPlayer = type === DividerType.PLAYER;
	const isInvestigator = type === DividerType.INVESTIGATOR;
	if (isTab && isInvestigator) {
		return specialIcon;
	}

	if (!isTab) {
		if (isPlayer) {
			return campaignIcon;
		}
		return;
	}

	return campaignIcon;
};
