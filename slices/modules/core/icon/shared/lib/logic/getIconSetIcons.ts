import { prop } from "ramda";
import type { Icon } from "../../model";

type Options = {
	icons: Icon[];
	iconSet: string;
};

export const getIconSetIcons = ({ icons, iconSet }: Options) =>
	icons.filter((icon) => icon.iconSet === iconSet).map(prop("icon"));
