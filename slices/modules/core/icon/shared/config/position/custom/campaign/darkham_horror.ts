import { percent } from "@/shared/util";
import type { IconPositionManifest } from "../../../../model";
import { prefixIcons } from "../../util";

const icons: IconPositionManifest = {
	agents_of_the_ancestor: {
		left: percent(-1),
		top: percent(-1),
		scale: percent(90),
	},
	deep_treasures: {
		left: percent(-1),
		top: percent(-1),
		scale: percent(90),
	},
	dungeon_supplies: {
		left: percent(-3),
	},
	gods_converge: {
		top: percent(-1),
		scale: percent(110),
	},
	halls_of_power: {
		top: percent(-5),
		left: percent(-2),
		scale: percent(95),
	},
	long_journey: {
		top: percent(2),
		left: percent(-2),
	},
	setting_sun: {
		top: percent(2),
		left: percent(-1),
		scale: percent(85),
	},
	the_dark: {
		top: percent(-2),
		scale: percent(103),
	},
	the_ordained: {
		left: percent(-1),
		top: percent(-1),
		scale: percent(105),
	},
	the_templar: {
		left: percent(-1),
		top: percent(-1),
	},
	beneath_the_manor: {
		left: percent(-1),
		top: percent(-1),
	},
	the_study_of_life: {
		left: percent(-1),
		top: percent(-1),
	},
	blind_leading_the_blind: {
		left: percent(-1),
		top: percent(-4),
	},
	wolves_at_the_door: {
		left: percent(-1),
		top: percent(-2),
	},
	lost_in_the_woods: {},
	summoning_courage: {
		left: percent(-1),
		top: percent(-1),
		scale: percent(105),
	},
	rising_tides: {
		top: percent(1),
	},
	heart_of_darkness: {
		top: percent(-1),
	},
};

const prefixedIcons = prefixIcons("darkham_horror", icons);

export default {
	darkham_horror: {
		top: percent(-2),
		scale: percent(105),
	},
	...prefixedIcons,
} as IconPositionManifest;
