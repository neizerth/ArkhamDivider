import { percent } from "@/shared/util";
import type { IconPositionManifest } from "../../../../model";
import { prefixIcons } from "../../util";

const icons: IconPositionManifest = {
	wards_and_traps: {
		top: percent(3),
	},
	custodes: {
		top: percent(-1),
	},
	traps: {
		top: percent(-2),
		left: percent(1),
		scale: percent(95),
	},
	despair: {
		top: percent(-2),
	},
	daytime: {
		scale: percent(105),
	},
	nighttime: {
		left: percent(-5),
	},
	deep_hunters: {
		left: percent(-2),
		scale: percent(85),
	},
	warriors_of_the_deep: {
		left: percent(-2),
		scale: percent(85),
	},
	dread_city: {
		top: percent(3),
		left: percent(1),
		scale: percent(115),
	},
	bombardment: {
		scale: percent(100),
	},
	dread_cthulhu: {
		top: percent(1),
		scale: percent(105),
	},
	rise_of_rlyeh: {
		top: percent(2),
		left: percent(-2),
		scale: percent(90),
	},
	escape_from_rlyeh: {
		top: percent(-2),
		left: percent(2),
		scale: percent(90),
	},
};

const prefixedIcons = prefixIcons("shadows_of_yog_sothoth", icons);

export default {
	shadows_of_yog_sothoth: {
		left: percent(3),
		scale: percent(92),
	},
	...prefixedIcons,
} as IconPositionManifest;
