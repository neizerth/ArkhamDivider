import { percent } from "@/shared/util";
import type { IconPositionManifest } from "../../../../model";
import { prefixIcons } from "../../util";

const icons: IconPositionManifest = {
	museum: {
		top: percent(1),
		left: percent(-2),
		scale: percent(110),
	},
	guards: {
		top: percent(-5),
		left: percent(-2),
		scale: percent(115),
	},
	cultists: {
		top: percent(-2),
		left: percent(-2),
		scale: percent(115),
	},
	choice: {
		top: percent(-2),
		scale: percent(105),
	},
	cairo_streets: {
		left: percent(-1),
		scale: percent(115),
	},
	cobra: {
		top: percent(2),
		left: percent(-1),
		scale: percent(115),
	},
	islamic_district: {
		left: percent(-4),
	},
	kidnappers: {
		top: percent(2),
		left: percent(-2),
		scale: percent(125),
	},
	southeastern_cairo: {
		top: percent(-4),
		left: percent(-2),
		scale: percent(120),
	},
	sphinx: {
		left: percent(-1),
		top: percent(-10),
		scale: percent(105),
	},
	worship: {
		top: percent(-6),
		left: percent(1),
		scale: percent(110),
	},
	abomination: {
		left: percent(-1),
		top: percent(-2),
		scale: percent(110),
	},
	will_to_triumph: {
		top: percent(-2),
		scale: percent(115),
	},
};

const prefixedIcons = prefixIcons("of_sphinx_and_sands", icons);

export default {
	of_sphinx_and_sands: {
		top: percent(-2),
		left: percent(-2),
	},
	book: {
		left: percent(-1),
		top: percent(-2),
	},
	...prefixedIcons,
} as IconPositionManifest;
