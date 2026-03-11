import { percent } from "@/shared/util";
import type { IconPositionManifest } from "../../../../model";

const icons: IconPositionManifest = {
	agents_of_amygdala: {
		top: percent(-4),
		left: percent(3),
	},
	agents_of_mergo: {
		top: percent(-4),
		left: percent(2),
		scale: percent(95),
	},
	agents_of_oedon: {
		left: percent(3),
	},
	agents_of_paleblood: {
		top: percent(-2),
		left: percent(3),
	},
	agents_of_rom: {
		left: percent(4),
		top: percent(-4),
	},
	beasts: {
		top: percent(-2),
		left: percent(4),
		scale: percent(95),
	},
	quite_thrilling: {
		top: percent(-4),
		left: percent(3),
	},
	welcome_to_yharnam: {
		top: percent(-6),
		left: percent(3),
		scale: percent(95),
	},
	corruption: {
		top: percent(-3),
		left: percent(3),
		scale: percent(95),
	},
	radiance: {
		top: percent(-8),
		left: percent(2),
		scale: percent(90),
	},
	clawmark: {
		top: percent(-5),
		left: percent(4),
	},
	arcane_lake: {
		left: percent(3),
		scale: percent(95),
	},
	great_deep_sea: {
		top: percent(2),
		left: percent(3),
		scale: percent(90),
	},
	hunters_of_yharnam: {
		top: percent(-2),
		left: percent(2),
	},
	lumenflower: {
		top: percent(-2),
		left: percent(3),
	},
	metamorphosis: {
		top: percent(-3),
		left: percent(4),
	},
	milkweed: {
		top: percent(-3),
		left: percent(3),
		scale: percent(95),
	},
	eldritch_eye: {
		top: percent(-5),
		left: percent(3),
		scale: percent(95),
	},
	paleblood_moon: {
		top: percent(-3),
		left: percent(3),
		scale: percent(95),
	},
	oedon_writhe: {
		top: percent(-2),
		left: percent(3),
		scale: percent(95),
	},
	silent_prayer: {
		top: percent(-2),
		left: percent(5),
		scale: percent(92),
	},
	impurity: {
		top: percent(-1),
		left: percent(3),
		scale: percent(95),
	},
	celestial: {
		top: percent(-3),
		left: percent(4),
		scale: percent(95),
	},
	astral_clocktower: {
		top: percent(-2),
		left: percent(3),
	},
	living_string: {
		top: percent(-4),
		left: percent(3),
	},
	pthemerian_heir: {
		top: percent(-2),
		left: percent(3),
		scale: percent(95),
	},
	blood_rapture: {
		top: percent(-4),
		left: percent(3),
	},
	hanged_man: {
		top: percent(-3),
		left: percent(3),
		scale: percent(90),
	},
	guidance: {
		top: percent(-3),
		left: percent(3),
		scale: percent(90),
	},
	quests: {
		top: percent(-3),
		left: percent(6),
		scale: percent(80),
	},
	the_hunt_begins: {
		top: percent(-3),
		left: percent(3),
	},
	fear_the_old_blood: {
		top: percent(-6),
		left: percent(3),
		scale: percent(95),
	},
	night_unending: {
		top: percent(-5),
		left: percent(5),
		scale: percent(105),
	},
	the_frailty_of_men: {
		top: percent(-3),
		left: percent(3),
		scale: percent(90),
	},
	the_altar_of_despair: {
		top: percent(-3),
		left: percent(3),
	},
	a_call_beyond: {
		top: percent(-3),
		left: percent(3),
		scale: percent(85),
	},
	communion: {
		top: percent(-2),
		left: percent(3),
		scale: percent(95),
	},
	arkham_sunrise: {
		top: percent(-2),
		left: percent(3),
		scale: percent(95),
	},
};

const prefixed = Object.entries(icons).reduce((acc, [key, value]) => {
	acc[`bloodborne-${key}`] = value;
	return acc;
}, {} as IconPositionManifest);

export default {
	bloodborne: {
		top: percent(-3),
		left: percent(4),
		scale: percent(90),
	},
	...prefixed,
} as IconPositionManifest;
