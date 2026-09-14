import { percent } from "@/shared/util";
import type { IconPositionManifest } from "../../../../model";
import { prefixIcons } from "../../util";

const icons: IconPositionManifest = {
	surging_rats: {
		top: percent(-4),
		scale: percent(150),
	},
	manifold: {
		scale: percent(130),
	},
	miskatonic_offerings: {
		top: percent(-2),
		scale: percent(120),
	},
	boston_red_line: {
		top: percent(-2),
		scale: percent(120),
	},
	cold_cold_heart: {
		scale: percent(130),
	},
	dark_dreams: {
		top: percent(-2),
		scale: percent(160),
	},
};

const prefixed = prefixIcons("betrayal_at_the_mountains_of_madness", icons);

export default {
	...prefixed,
} as IconPositionManifest;
