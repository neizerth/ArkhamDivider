import type { Location } from "react-router";
import { isDividerType } from "@/modules/divider/shared/lib";

export const getLocationDividerType = (location: Location) => {
	const match = location.pathname.match(/\/layout\/[\w-]+\/([\w-]+)$/);
	if (!match) {
		return null;
	}

	const type = match[1];

	if (!isDividerType(type)) {
		return null;
	}

	return type;
};
