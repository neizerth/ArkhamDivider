import type { To } from "react-router";

export const prependToPathname = (to: To, value: string): To => {
	if (typeof to === "string") {
		return `${value}${to}`;
	}
	return {
		...to,
		pathname: `${value}${to.pathname}`,
	};
};
