import { useMemo } from "react";
import { useDividerIcon } from "@/modules/divider/features/lib";
import type {
	SarnetskyDividerObjects,
	SarnetskyDividerProps,
} from "../../model";
import { getSarnetskyDefaultDividerIcon } from "../logic";

type Options = {
	divider: SarnetskyDividerProps;
	objects: SarnetskyDividerObjects;
};

export const useSarnetskyDividerIcons = ({ divider, objects: O }: Options) => {
	const { icon, id, type } = divider;
	const getDividerIcon = useDividerIcon({
		dividerId: id,
		icon,
	});

	const iconObjects = O.icons[type] ?? [];

	const defaultCampaignIcon = divider.story?.icon;

	return useMemo(() => {
		return iconObjects.map((config) => {
			const defaultIcon = getSarnetskyDefaultDividerIcon({
				type: config.type,
				iconId: config.id,
				icon,
				campaignIcon: defaultCampaignIcon,
			});

			const [currentIcon, setIcon] = getDividerIcon({
				param: config.id,
				defaultIcon,
			});

			return {
				icon: currentIcon,
				setIcon,
				config,
			};
		});
	}, [iconObjects, getDividerIcon, defaultCampaignIcon, icon]);
};
