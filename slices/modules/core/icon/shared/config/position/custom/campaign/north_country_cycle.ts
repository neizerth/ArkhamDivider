import { percent } from "@/shared/util";
import type { IconPositionManifest } from "../../../../model";
import { prefixIcons } from "../../util";

const icons: IconPositionManifest = {
	fire_cult: {
		top: percent(-6),
		left: percent(4),
		scale: percent(95),
	},
	blazing_fire: {
		top: percent(-6),
		left: percent(4),
		scale: percent(95),
	},
	wrotham_sheriff: {
		top: percent(-2),
		left: percent(4),
	},
	burning_ground: {
		top: percent(1),
		left: percent(2),
		scale: percent(95),
	},
	wrotham_backcountry: {
		top: percent(1),
		left: percent(3),
	},
	wrotham_township: {
		top: percent(-4),
		left: percent(4),
		scale: percent(90),
	},
	north_woods: {
		top: percent(2),
		left: percent(3),
		scale: percent(115),
	},
};

const prefixedIcons = prefixIcons("north_country_cycle", icons);

export default {
	north_country_cycle: {
		top: percent(-3),
		left: percent(3),
		scale: percent(95),
	},
	...prefixedIcons,
} as IconPositionManifest;
