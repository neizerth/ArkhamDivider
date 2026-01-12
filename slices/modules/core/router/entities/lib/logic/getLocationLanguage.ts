import type { Location } from "react-router";

export const getLocationLanguage = (location: Location | null) => {
	if (!location) {
		return null;
	}
	const parts = location.pathname.split("/");
	return parts[1] ?? null;
};
