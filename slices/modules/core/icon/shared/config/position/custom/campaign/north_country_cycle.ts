import { percent } from "@/shared/util";
import type { IconPositionManifest } from "../../../../model";
import { prefixIcons } from "../../util";

const icons: IconPositionManifest = {
	fire_cult: {
		top: percent(-4),
		scale: percent(95),
	},
	blazing_fire: {
		top: percent(-4),
		scale: percent(95),
	},
	wrotham_sheriff: {},
	burning_ground: {
		top: percent(3),
		left: percent(-2),
		scale: percent(95),
	},
	wrotham_backcountry: {
		left: percent(-1),
		top: percent(3),
	},
	wrotham_township: {
		top: percent(-2),
		scale: percent(90),
	},
	north_woods: {
		left: percent(-1),
		top: percent(4),
		scale: percent(115),
	},
};

const prefixedIcons = prefixIcons("north_country_cycle", icons);

export default {
	north_country_cycle: {
		left: percent(-1),
		top: percent(-1),
		scale: percent(95),
	},
	...prefixedIcons,
} as IconPositionManifest;
