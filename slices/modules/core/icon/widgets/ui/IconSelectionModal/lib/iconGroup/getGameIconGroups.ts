import { getIconSetIcons } from "@/modules/core/icon/shared/lib";
import type { Icon } from "@/modules/core/icon/shared/model";
import type { IconGroup } from "../../model";

type Options = {
	icons: Icon[];
};

export const getGameIconGroups = ({ icons }: Options): IconGroup[] => {
	const createIconSetGroup = (name: string, iconSet: string = name) => ({
		id: name.toLowerCase(),
		name,
		groups: [
			{
				id: name.toLowerCase(),
				icons: getIconSetIcons({ icons, iconSet }),
			},
		],
	});

	return [
		createIconSetGroup("Card Icons"),
		createIconSetGroup("Cost"),
		createIconSetGroup("Tokens", "tokens"),
		createIconSetGroup("Arkham Cards", "App"),
		createIconSetGroup("Arkham Slim"),
	];
};
