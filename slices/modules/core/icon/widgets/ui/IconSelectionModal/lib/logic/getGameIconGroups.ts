import { getIconSetIcons } from "@/modules/core/icon/shared/lib";
import type { ArkhamDividerIcon } from "@/modules/core/icon/shared/model";
import {
	arkhamCardsIgnoredIcons,
	arkhamSlimIgnoredIcons,
	arkhamSlimSpecialIcons,
	factionIcons,
	locationIcons,
	signIcons,
	slotIcons,
	statsIcons,
	tokenIcons,
} from "../../config/icons";
import type { IconGroup } from "../../model";

type Options = {
	icons: ArkhamDividerIcon[];
};

export const getGameIconGroups = ({ icons }: Options): IconGroup[] => {
	const createIconSetGroup = (name: string, iconSet: string = name) => {
		const groupIcons = getIconSetIcons({ icons, iconSet });
		return createIconGroup(name, groupIcons);
	};

	const arkhamSlimIcons = getIconSetIcons({
		icons,
		iconSet: "Arkham Slim",
	})
		.filter((icon) => !arkhamSlimIgnoredIcons.includes(icon))
		.concat(arkhamSlimSpecialIcons);

	const arkhamCardsIcons = getIconSetIcons({
		icons,
		iconSet: "App",
	}).filter((icon) => !arkhamCardsIgnoredIcons.includes(icon));

	return [
		createIconGroup("Faction", factionIcons),
		createIconGroup("Slot", slotIcons),
		createIconGroup("Stats", statsIcons),
		createIconSetGroup("Cost"),
		createIconGroup("Location", locationIcons),
		createIconGroup("Tokens", tokenIcons),
		createIconGroup("Signs", signIcons),
		createIconGroup("Other", arkhamSlimIcons),
		createIconGroup("Arkham Cards", arkhamCardsIcons),
	];
};

const createIconGroup = (name: string, icons: string[]) => {
	const id = name.toLowerCase();
	return {
		id,
		name,
		groups: [
			{
				id,
				icons,
			},
		],
	};
};
