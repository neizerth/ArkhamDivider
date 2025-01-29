import { prop } from "ramda";
import { IGetIconGroupsOptions } from "./getIconGroups";
import { safePropEq } from "@/shared/lib/features/util/criteria";
import { IIconMainGroup } from "@/shared/model/types/icons";

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
