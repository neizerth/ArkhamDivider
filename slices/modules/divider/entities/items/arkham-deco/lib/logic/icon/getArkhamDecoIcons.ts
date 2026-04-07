import { getDividerIcon } from "@/modules/divider/features/lib";
import type { DividerType } from "@/modules/divider/shared/model";
import type {
	ArkhamDecoDividerLayout,
	ArkhamDecoDividerProps,
	ArkhamDecoIcon,
} from "../../../model";
import { isArkhamDecoCompactLayout } from "../isArkhamDecoCompactLayout";
import { getArkhamDecoDefaultCampaignIcon } from "./getArkhamDecoDefaultCampaignIcon";
import { getArkhamDecoDefaultSecondaryIcon } from "./getArkhamDecoDefaultSecondaryIcon";

type Options = {
	divider: ArkhamDecoDividerProps;
	layout: ArkhamDecoDividerLayout;
};

type Input = {
	type: DividerType;
	campaign: ArkhamDecoIcon;
	small: ArkhamDecoIcon;
	secondary: ArkhamDecoIcon;
};

export const getArkhamDecoIcons = ({ divider, layout }: Options) => {
	const defaultCampaignIcon = getArkhamDecoDefaultCampaignIcon(divider);
	const defaultSecondaryIcon = getArkhamDecoDefaultSecondaryIcon(divider);

	const smallIcon = getDividerIcon({
		divider,
		param: "smallIcon",
		defaultIcon: divider.icon,
	});

	const campaignIcon = getDividerIcon({
		divider,
		param: "campaignIcon",
		defaultIcon: defaultCampaignIcon,
	});

	const secondaryIcon = getDividerIcon({
		divider,
		param: "secondaryIcon",
		defaultIcon: defaultSecondaryIcon,
	});

	const small = {
		icon: smallIcon,
		param: "smallIcon",
		defaultIcon: divider.icon,
	};

	const secondary = {
		icon: secondaryIcon,
		param: "secondaryIcon",
		defaultIcon: defaultSecondaryIcon,
	};

	const campaign = {
		icon: campaignIcon,
		param: "campaignIcon",
		defaultIcon: defaultCampaignIcon,
	};

	const isCompact = isArkhamDecoCompactLayout(layout);

	const getIcons = isCompact ? getTabIcons : getHorizontalIcons;

	return getIcons({
		type: divider.type,
		campaign,
		small,
		secondary,
	});
};

const getTabIcons = ({ campaign, small, secondary, type }: Input) => {
	if (type === "player") {
		return {
			left: secondary,
			right: null,
			center: campaign,
		};
	}
	return {
		left: small,
		right: null,
		center: campaign,
	};
};

const getHorizontalIcons = ({ type, campaign, small, secondary }: Input) => {
	if (type === "campaign") {
		return {
			left: null,
			right: campaign,
			center: null,
		};
	}

	if (type === "player") {
		return {
			left: secondary,
			right: small,
			center: campaign,
		};
	}

	if (type === "investigator") {
		return {
			left: small,
			right: secondary,
			center: campaign,
		};
	}

	return {
		left: small,
		right: campaign,
		center: null,
	};
};
