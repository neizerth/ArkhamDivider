import { percent } from "@/shared/util";
import type { IconPositionManifest } from "../../../../model";

export default {
	heart_of_darkness: {
		top: percent(-1),
		scale: percent(93),
	},
	lands_of_the_congo: {
		top: percent(2),
		left: percent(-3),
	},
	african_wildlife: {
		top: percent(-3),
	},
	the_darkness: {
		top: percent(-3),
	},
	cult_of_darkness: {
		top: percent(-1),
		left: percent(-2),
	},
	africa_is_watching: {
		left: percent(-1),
		top: percent(-4),
		scale: percent(95),
	},
	to_the_heart_of_the_congo: {
		top: percent(-4),
		scale: percent(90),
	},
	the_avatar_of_darkness: {
		left: percent(-1),
		top: percent(-3),
	},
} as IconPositionManifest;
