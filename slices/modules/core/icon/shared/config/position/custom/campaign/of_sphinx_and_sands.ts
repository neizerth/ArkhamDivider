import { percent } from "@/shared/util";
import type { IconPositionManifest } from "../../../../model";
import { prefixIcons } from "../../util";

const icons: IconPositionManifest = {
	museum: {
		top: percent(-1),
		left: percent(2),
		scale: percent(110),
	},
	guards: {
		top: percent(-7),
		left: percent(2),
		scale: percent(115),
	},
	cultists: {
		top: percent(-4),
		left: percent(2),
		scale: percent(115),
	},
	choice: {
		top: percent(-4),
		left: percent(4),
		scale: percent(105),
	},
	cairo_streets: {
		top: percent(-2),
		left: percent(3),
		scale: percent(115),
	},
	cobra: {
		left: percent(3),
		scale: percent(115),
	},
	islamic_district: {
		top: percent(-2),
	},
	kidnappers: {
		left: percent(2),
		scale: percent(125),
	},
	southeastern_cairo: {
		top: percent(-6),
		left: percent(2),
		scale: percent(120),
	},
	sphinx: {
		top: percent(-12),
		left: percent(3),
		scale: percent(105),
	},
	worship: {
		top: percent(-8),
		left: percent(5),
		scale: percent(110),
	},
	abomination: {
		top: percent(-4),
		left: percent(3),
		scale: percent(110),
	},
	will_to_triumph: {
		top: percent(-4),
		left: percent(4),
		scale: percent(115),
	},
};

const prefixedIcons = prefixIcons("of_sphinx_and_sands", icons);

export default {
	of_sphinx_and_sands: {
		top: percent(-4),
		left: percent(2),
	},
	book: {
		top: percent(-4),
		left: percent(3),
	},
	...prefixedIcons,
} as IconPositionManifest;
