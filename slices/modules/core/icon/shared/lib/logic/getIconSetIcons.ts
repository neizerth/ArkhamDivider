import { prop } from "ramda";
import type { ArkhamDividerIcon } from "../../model";

type Options = {
	icons: ArkhamDividerIcon[];
	iconSet: string;
};

export const getIconSetIcons = ({ icons, iconSet }: Options) =>
	icons.filter((icon) => icon.iconSet === iconSet).map(prop("icon"));
