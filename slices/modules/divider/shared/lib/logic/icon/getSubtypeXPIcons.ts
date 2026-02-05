import type { DividerSubtype } from "../../../model";

export const getSubtypeXPIcons = (subtype: DividerSubtype) => {
	if (["bonded", "customizations"].includes(subtype)) {
		return {
			type: "fixed" as const,
			icon: "inverted_level_none",
			background: "inverted_level_0",
		};
	}
};
