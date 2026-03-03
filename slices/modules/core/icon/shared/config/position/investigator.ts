import { percent } from "@/shared/util";
import type { IconPositionManifest } from "../../model";

export default {
	guardian: {
		top: percent(2),
		left: percent(4),
	},
	rogue: {
		left: percent(4),
		scale: 0.9,
	},
	seeker: {
		top: percent(-2),
		left: percent(6),
		scale: 0.95,
	},
	survivor: {
		top: percent(2),
		left: percent(4),
	},
	mystic: {
		left: percent(4),
	},
	mystic_alt: {
		top: percent(-2),
		left: percent(4),
	},
	neutral: {
		top: percent(-3),
		left: percent(5),
		scale: 0.9,
	},
	multiclass: {
		left: percent(5),
	},
} as IconPositionManifest;
