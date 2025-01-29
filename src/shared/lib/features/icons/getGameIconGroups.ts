import { safePropEq } from "@/shared/lib/features/util/criteria";
import type { IIconMainGroup } from "@/shared/model/types/icons";
import { prop } from "ramda";
import type { IGetIconGroupsOptions } from "./getIconGroups";

export const getGameIconGroups = ({
	icons,
}: IGetIconGroupsOptions): IIconMainGroup[] => {
	const getIconSet = (name: string) =>
		icons.filter(safePropEq(name, "iconSet")).map(prop("icon"));

	const createIconSetGroup = (name: string, iconSet: string = name) => ({
		id: name.toLowerCase(),
		name,
		groups: [
			{
				id: name.toLowerCase(),
				icons: getIconSet(iconSet),
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
