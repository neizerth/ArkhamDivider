import type { Location } from "react-router";
import { isDividerType } from "@/modules/divider/shared/lib";

export const getLocationStoryCode = (location: Location) => {
	const match = location.pathname.match(/\/layout\/([\w-]+)\/([\w-]+)$/);

	if (!match) {
		return null;
	}
	if (isDividerType(match[2])) {
		return match[1];
	}
	return match[2];
};
