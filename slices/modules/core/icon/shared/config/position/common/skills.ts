import { percent } from "@/shared/util";
import type { IconPositionManifest } from "../../../model";

export default {
	skill_willpower: {
		top: percent(-3),
		left: percent(3),
		scale: percent(120),
	},
	skill_willpower_inverted: {
		top: percent(-4),
		left: percent(3),
		scale: percent(130),
	},
	skill_intellect: {
		top: percent(-5),
		left: percent(3),
		scale: percent(120),
	},
	skill_intellect_inverted: {
		top: percent(-6),
		left: percent(1),
		scale: percent(140),
	},
	skill_combat: {
		top: percent(-5),
		left: percent(3),
		scale: percent(120),
	},
	skill_combat_inverted: {
		top: percent(-3),
		left: percent(6),
		scale: percent(130),
	},
	skill_agility: {
		top: percent(-5),
		left: percent(3),
		scale: percent(110),
	},
	skill_agility_inverted: {
		top: percent(-1),
		left: percent(4),
		scale: percent(120),
	},
	skill_wild: {
		top: percent(-4),
		left: percent(3),
		scale: percent(120),
	},
	skill_wild_inverted: {
		top: percent(-9),
		left: percent(2),
		scale: percent(130),
	},
} as IconPositionManifest;
