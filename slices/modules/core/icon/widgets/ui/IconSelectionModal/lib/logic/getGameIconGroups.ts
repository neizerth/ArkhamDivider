import { compact } from "ramda-adjunct";
import { getIconSetIcons } from "@/modules/core/icon/shared/lib";
import type {
	ArkhamDividerIcon,
	IconSelectionMode,
} from "@/modules/core/icon/shared/model";
import {
	arkhamCardsIgnoredIcons,
	arkhamSlimIgnoredIcons,
	arkhamSlimSpecialIcons,
	cardLevelIcons,
	factionIcons,
	locationIcons,
	outlinedIcons,
	signIcons,
	slotIcons,
	statsIcons,
	tokenIcons,
} from "../../config/icons";
import type { IconGroup } from "../../model";

type Options = {
	icons: ArkhamDividerIcon[];
	mode: IconSelectionMode;
};

export const getGameIconGroups = ({ icons, mode }: Options): IconGroup[] => {
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

	const isPreview = mode === "preview";

	return compact([
		createIconGroup("Faction", factionIcons),
		createIconGroup("Slot", slotIcons),
		createIconGroup("Stats", statsIcons),
		createIconSetGroup("Cost"),
		isPreview && createIconGroup("Outline", outlinedIcons),
		isPreview && createIconGroup("Card Level", cardLevelIcons),

		createIconGroup("Location", locationIcons),
		createIconGroup("Tokens", tokenIcons),
		createIconGroup("Signs", signIcons),
		createIconGroup("Other", arkhamSlimIcons),
		createIconGroup("Arkham Cards", arkhamCardsIcons),
	]);
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
