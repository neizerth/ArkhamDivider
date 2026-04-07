import { percent } from "@/shared/util";
import type { IconPositionManifest } from "../../../model";

export default {
	wotog: {
		top: percent(-1),
		left: percent(-3),
	},
	children_of_paradise: {
		left: percent(-1),
	},
	assimilating_swarm: {
		top: percent(-2),
		left: percent(-3),
	},
	death_of_the_stars: {
		left: percent(-1),
		top: percent(-2),
		scale: percent(90),
	},
	war_of_the_outer_gods: {
		top: percent(-2),
	},
} as IconPositionManifest;
