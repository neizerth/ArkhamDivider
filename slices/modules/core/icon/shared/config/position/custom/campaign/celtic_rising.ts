import { percent } from "@/shared/util";
import type { IconPositionManifest } from "../../../../model";
import { prefixIcons } from "../../util";

export const icons: IconPositionManifest = {
	frozen_winds: {
		left: percent(1),
		scale: percent(95),
	},
	celtic_evils: {
		left: percent(-1),
		top: percent(-6),
	},
	pests: {
		top: percent(-4),
	},
	burnt_air: {},
	angry_pixies: {
		top: percent(4),
	},
	mischievous_fairies: {
		top: percent(4),
	},
	roadside: {
		left: percent(-4),
		top: percent(-4),
		scale: percent(95),
	},
	lock_and_key: {},
	sealed_runes: {
		top: percent(-2),
		scale: percent(109),
	},
	beyond_the_grave: {},
	the_deep_woods: {
		top: percent(8),
	},
	waterside: {
		left: percent(-4),
		scale: percent(90),
	},
	cave_path: {
		top: percent(-2),
		scale: percent(90),
	},
	balors_command: {
		left: percent(-1),
		top: percent(-1),
	},
	balors_might: {
		left: percent(1),
	},
	berserker: {
		top: percent(-1),
		left: percent(1),
	},
	caorthannach: {
		top: percent(-1),
		left: percent(-2),
	},
	abject_mania: {
		top: percent(-2),
		scale: percent(105),
	},
	losing_hope: {
		left: percent(-1),
		top: percent(4),
	},
	morrigans_will: {
		top: percent(-1),
		scale: percent(95),
	},
	caorthannachs_song: {
		top: percent(-2),
		scale: percent(95),
	},
	away_with_the_fairies: {
		left: percent(-2),
		scale: percent(107),
	},
	the_stephens_manor: {
		top: percent(-4),
	},
	flight_from_the_dullahan: {
		top: percent(-2),
	},
	balor_rising: {
		left: percent(-1),
		top: percent(-2),
	},
};

const prefixed = prefixIcons("celtic_rising", icons);

export default {
	celtic_rising: {
		left: percent(-1),
		scale: percent(90),
	},
	...prefixed,
};
