import { percent } from "@/shared/util";
import type { IconPositionManifest } from "../../../model";

export default {
	class_rogue: {
		left: percent(-1),
		top: percent(-1),
		scale: percent(90),
	},

	class_seeker: {
		top: percent(-2),
		scale: percent(90),
	},

	class_survivor: {
		top: percent(4),
	},
	mystic: {
		left: percent(-1),
		top: percent(-10),
		scale: percent(90),
	},
	mystic_alt: {
		top: percent(-2),
		scale: percent(85),
	},
	class_mystic: {
		left: percent(-1),
		top: percent(-10),
		scale: percent(90),
	},
	neutral: {
		left: percent(-1),
		scale: percent(85),
	},
	class_neutral: {
		left: percent(-1),
		top: percent(-3),
	},
	multiclass: {
		top: percent(-1),
	},
	rogue: {
		scale: percent(75),
	},
	guardian: {
		top: percent(3),
	},
	seeker: {
		left: percent(3),
		top: percent(-4),
		scale: percent(85),
	},
	survivor: {
		top: percent(6),
	},
} as IconPositionManifest;
