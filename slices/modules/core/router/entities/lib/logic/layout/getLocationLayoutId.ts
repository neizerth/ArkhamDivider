import type { Location } from "react-router";

export const getLocationLayoutId = (location: Location) => {
	const match = location.pathname.match(/\/layout\/([\w-]+)/);

	if (!match) {
		return null;
	}
	return match[1];
};
