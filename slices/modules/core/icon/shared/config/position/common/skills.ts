import { percent } from "@/shared/util";
import type { IconPositionManifest } from "../../../model";

export default {
	skill_willpower: {
		left: percent(-1),
		top: percent(-1),
		scale: percent(120),
	},
	skill_willpower_inverted: {
		left: percent(-1),
		top: percent(-2),
		scale: percent(130),
	},
	skill_intellect: {
		left: percent(-1),
		top: percent(-3),
		scale: percent(120),
	},
	skill_intellect_inverted: {
		top: percent(-4),
		left: percent(-3),
		scale: percent(140),
	},
	skill_combat: {
		left: percent(-1),
		top: percent(-3),
		scale: percent(120),
	},
	skill_combat_inverted: {
		top: percent(-1),
		left: percent(2),
		scale: percent(130),
	},
	skill_agility: {
		left: percent(-1),
		top: percent(-3),
		scale: percent(110),
	},
	skill_agility_inverted: {
		top: percent(1),
		scale: percent(120),
	},
	skill_wild: {
		left: percent(-1),
		top: percent(-2),
		scale: percent(120),
	},
	skill_wild_inverted: {
		top: percent(-7),
		left: percent(-2),
		scale: percent(130),
	},
} as IconPositionManifest;
