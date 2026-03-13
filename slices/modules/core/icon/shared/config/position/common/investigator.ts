import { percent } from "@/shared/util";
import type { IconPositionManifest } from "../../../model";

export default {
	guardian: {
		top: percent(-2),
		left: percent(3),
	},
	rogue: {
		top: percent(-3),
		left: percent(3),
		scale: percent(90),
	},
	class_rogue: {
		top: percent(-3),
		left: percent(3),
		scale: percent(90),
	},
	seeker: {
		top: percent(-4),
		left: percent(6),
		scale: percent(95),
	},
	class_seeker: {
		top: percent(-4),
		left: percent(4),
		scale: percent(90),
	},
	survivor: {
		top: percent(2),
		left: percent(4),
	},
	class_survivor: {
		top: percent(2),
		left: percent(4),
	},
	mystic: {
		top: percent(-12),
		left: percent(3),
		scale: percent(90),
	},
	mystic_alt: {
		top: percent(-2),
		left: percent(4),
	},
	class_mystic: {
		top: percent(-12),
		left: percent(3),
		scale: percent(90),
	},
	neutral: {
		top: percent(-6),
		left: percent(3),
		scale: percent(85),
	},
	class_neutral: {
		top: percent(-5),
		left: percent(3),
	},
	multiclass: {
		top: percent(-6),
		left: percent(3),
	},
} as IconPositionManifest;
