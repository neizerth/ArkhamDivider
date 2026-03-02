import { getIconSetIcons } from "@/modules/core/icon/shared/lib";
import type { ArkhamDividerIcon } from "@/modules/core/icon/shared/model";
import {
	arkhamSlimIgnoredIcons,
	arkhamSlimSpecialIcons,
	factionIcons,
	slotIcons,
	statsIcons,
} from "../../../config/icons";
import type { IconGroup } from "../../../model";

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

	return [
		createIconGroup("Faction", factionIcons),
		createIconGroup("Slot", slotIcons),
		createIconGroup("Stats", statsIcons),
		createIconSetGroup("Cost"),
		createIconSetGroup("Arkham Cards", "App"),
		createIconGroup("Other", arkhamSlimIcons),
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
