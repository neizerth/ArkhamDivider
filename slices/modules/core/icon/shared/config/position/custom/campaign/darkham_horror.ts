import { percent } from "@/shared/util";
import type { IconPositionManifest } from "../../../../model";
import { prefixIcons } from "../../util";

const icons: IconPositionManifest = {
	agents_of_the_ancestor: {
		top: percent(-3),
		left: percent(3),
		scale: percent(90),
	},
	deep_treasures: {
		top: percent(-3),
		left: percent(3),
		scale: percent(90),
	},
	dungeon_supplies: {
		top: percent(-2),
		left: percent(1),
	},
	gods_converge: {
		top: percent(-3),
		left: percent(4),
		scale: percent(110),
	},
	halls_of_power: {
		top: percent(-7),
		left: percent(2),
		scale: percent(95),
	},
	long_journey: {
		left: percent(2),
	},
	setting_sun: {
		left: percent(3),
		scale: percent(85),
	},
	the_dark: {
		top: percent(-4),
		left: percent(4),
		scale: percent(103),
	},
	the_ordained: {
		top: percent(-3),
		left: percent(3),
		scale: percent(105),
	},
	the_templar: {
		top: percent(-3),
		left: percent(3),
	},
	beneath_the_manor: {
		top: percent(-3),
		left: percent(3),
	},
	the_study_of_life: {
		top: percent(-3),
		left: percent(3),
	},
	blind_leading_the_blind: {
		top: percent(-6),
		left: percent(3),
	},
	wolves_at_the_door: {
		top: percent(-4),
		left: percent(3),
	},
	lost_in_the_woods: {
		top: percent(-2),
		left: percent(4),
	},
	summoning_courage: {
		top: percent(-3),
		left: percent(3),
		scale: percent(105),
	},
	rising_tides: {
		top: percent(-1),
		left: percent(4),
	},
	heart_of_darkness: {
		top: percent(-3),
		left: percent(4),
	},
};

const prefixedIcons = prefixIcons("darkham_horror", icons);

export default {
	darkham_horror: {
		top: percent(-4),
		left: percent(4),
		scale: percent(105),
	},
	...prefixedIcons,
} as IconPositionManifest;
