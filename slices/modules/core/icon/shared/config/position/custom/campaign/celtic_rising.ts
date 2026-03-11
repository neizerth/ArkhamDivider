import { percent } from "@/shared/util";
import type { IconPositionManifest } from "../../../../model";

export const icons: IconPositionManifest = {
	frozen_winds: {
		top: percent(-2),
		left: percent(5),
		scale: percent(95),
	},
	celtic_evils: {
		top: percent(-8),
		left: percent(3),
	},
	pests: {
		top: percent(-6),
		left: percent(4),
	},
	burnt_air: {
		top: percent(-2),
		left: percent(4),
	},
	angry_pixies: {
		top: percent(2),
		left: percent(4),
	},
	mischievous_fairies: {
		top: percent(2),
		left: percent(4),
	},
	roadside: {
		top: percent(-6),
		scale: percent(95),
	},
	lock_and_key: {
		top: percent(-2),
		left: percent(4),
	},
	sealed_runes: {
		top: percent(-4),
		left: percent(4),
		scale: percent(109),
	},
	beyond_the_grave: {
		top: percent(-2),
		left: percent(4),
	},
	the_deep_woods: {
		top: percent(6),
		left: percent(4),
	},
	waterside: {
		top: percent(-2),
		scale: percent(90),
	},
	cave_path: {
		top: percent(-4),
		left: percent(4),
		scale: percent(90),
	},
	balors_command: {
		top: percent(-3),
		left: percent(3),
	},
	balors_might: {
		top: percent(-2),
		left: percent(5),
	},
	berserker: {
		top: percent(-3),
		left: percent(5),
	},
	caorthannach: {
		top: percent(-3),
		left: percent(2),
	},
	abject_mania: {
		top: percent(-4),
		left: percent(4),
		scale: percent(105),
	},
	losing_hope: {
		top: percent(2),
		left: percent(3),
	},
	morrigans_will: {
		top: percent(-3),
		left: percent(4),
		scale: percent(95),
	},
	caorthannachs_song: {
		top: percent(-4),
		left: percent(4),
		scale: percent(95),
	},
	away_with_the_fairies: {
		top: percent(-2),
		left: percent(2),
		scale: percent(107),
	},
	the_stephens_manor: {
		top: percent(-6),
		left: percent(4),
	},
	flight_from_the_dullahan: {
		top: percent(-4),
		left: percent(4),
	},
	balor_rising: {
		top: percent(-4),
		left: percent(3),
	},
};

const prefixed = Object.entries(icons).reduce((acc, [key, value]) => {
	acc[`celtic_rising-${key}`] = value;
	return acc;
}, {} as IconPositionManifest);

export default {
	celtic_rising: {
		top: percent(-2),
		left: percent(3),
		scale: percent(90),
	},
	...prefixed,
};
