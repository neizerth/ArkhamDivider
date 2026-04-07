import { percent } from "@/shared/util";
import type { IconPositionManifest } from "../../../../model";
import { prefixIcons } from "../../util";

const icons: IconPositionManifest = {
	agents_of_amygdala: {
		left: percent(-1),
		top: percent(-2),
	},
	agents_of_mergo: {
		top: percent(-2),
		left: percent(-2),
		scale: percent(95),
	},
	agents_of_oedon: {},
	agents_of_paleblood: {
		left: percent(-1),
	},
	agents_of_rom: {
		top: percent(-2),
	},
	beasts: {
		scale: percent(95),
	},
	quite_thrilling: {
		left: percent(-1),
		top: percent(-2),
	},
	welcome_to_yharnam: {
		left: percent(-1),
		top: percent(-4),
		scale: percent(95),
	},
	corruption: {
		left: percent(-1),
		top: percent(-1),
		scale: percent(95),
	},
	radiance: {
		top: percent(-6),
		left: percent(-2),
		scale: percent(90),
	},
	clawmark: {
		top: percent(-3),
	},
	arcane_lake: {
		top: percent(2),
		left: percent(-1),
		scale: percent(95),
	},
	great_deep_sea: {
		left: percent(-1),
		top: percent(4),
		scale: percent(90),
	},
	hunters_of_yharnam: {
		left: percent(-2),
	},
	lumenflower: {
		left: percent(-1),
	},
	metamorphosis: {
		top: percent(-1),
	},
	milkweed: {
		left: percent(-1),
		top: percent(-1),
		scale: percent(95),
	},
	eldritch_eye: {
		left: percent(-1),
		top: percent(-3),
		scale: percent(95),
	},
	paleblood_moon: {
		left: percent(-1),
		top: percent(-1),
		scale: percent(95),
	},
	oedon_writhe: {
		left: percent(-1),
		scale: percent(95),
	},
	silent_prayer: {
		left: percent(1),
		scale: percent(92),
	},
	impurity: {
		left: percent(-1),
		top: percent(1),
		scale: percent(95),
	},
	celestial: {
		top: percent(-1),
		scale: percent(95),
	},
	astral_clocktower: {
		left: percent(-1),
	},
	living_string: {
		left: percent(-1),
		top: percent(-2),
	},
	pthemerian_heir: {
		left: percent(-1),
		scale: percent(95),
	},
	blood_rapture: {
		left: percent(-1),
		top: percent(-2),
	},
	hanged_man: {
		left: percent(-1),
		top: percent(-1),
		scale: percent(90),
	},
	guidance: {
		left: percent(-1),
		top: percent(-1),
		scale: percent(90),
	},
	quests: {
		top: percent(-1),
		left: percent(2),
		scale: percent(80),
	},
	the_hunt_begins: {
		left: percent(-1),
		top: percent(-1),
	},
	fear_the_old_blood: {
		left: percent(-1),
		top: percent(-4),
		scale: percent(95),
	},
	night_unending: {
		top: percent(-3),
		left: percent(1),
		scale: percent(105),
	},
	the_frailty_of_men: {
		left: percent(-1),
		top: percent(-1),
		scale: percent(90),
	},
	the_altar_of_despair: {
		left: percent(-1),
		top: percent(-1),
	},
	a_call_beyond: {
		left: percent(-1),
		top: percent(-1),
		scale: percent(85),
	},
	communion: {
		left: percent(-1),
		scale: percent(95),
	},
	arkham_sunrise: {
		left: percent(-1),
		scale: percent(95),
	},
};

const prefixed = prefixIcons("bloodborne", icons);

export default {
	bloodborne: {
		top: percent(-1),
		scale: percent(90),
	},
	...prefixed,
} as IconPositionManifest;
