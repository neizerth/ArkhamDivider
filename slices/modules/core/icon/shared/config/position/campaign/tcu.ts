import { percent } from "@/shared/util";
import type { IconPositionManifest } from "../../../model";
import { returnPosition } from "../util";

export default {
	spectral_predators: {
		left: percent(-1),
		top: percent(1),
	},
	the_watcher: {
		top: percent(1),
		scale: percent(85),
	},
	music_of_the_damned: {
		top: percent(5),
		left: percent(1),
	},
	agents_of_azathoth: {
		left: percent(2),
		top: percent(-1),
		scale: percent(110),
	},
	anettes_coven: {},
	witchcraft: {},
	unspeakable_fate: {
		top: percent(-2),
		left: percent(2),
	},
	spectral_realm: {},
	trapped_spirits: {
		top: percent(-1),
		left: percent(1),
	},
	bloodthirsty_spirits: {
		top: percent(1),
	},
	cold_fog: {
		top: percent(3),
	},
	threatening_evil: {
		top: percent(1),
		left: percent(2),
		scale: percent(105),
	},
	city_of_the_damned: {
		top: percent(6),
		left: percent(1),
	},
	the_circle_undone: {
		top: percent(2),
		scale: percent(90),
	},
	inexorable_fate: {},
	realm_of_death: {
		left: percent(1),
		top: percent(3),
	},
	witchwork: {
		left: percent(0.5),
		scale: percent(90),
	},
	the_witching_hour: {},
	at_deaths_doorstep: {
		top: percent(1),
	},
	silver_twilight_lodge: {
		top: percent(4),
		left: percent(1),
	},
	the_wages_of_sin: {
		top: percent(2),
		left: percent(-3),
		scale: percent(90),
	},
	city_of_sins: {
		top: percent(5),
		left: percent(-10),
	},
	for_the_greater_good: {
		top: percent(1),
		scale: percent(87),
	},
	return_to_for_the_greater_good: returnPosition,
	union_and_disillusion: {
		top: percent(2),
		left: percent(1),
	},
	in_the_clutches_of_chaos: {
		left: percent(-4),
		top: percent(3),
	},
	before_the_black_throne: {},
	rttcu: returnPosition,
	return_to_before_the_black_throne: returnPosition,
	disappearance_at_the_twilight_estate: returnPosition,
	return_to_disappearance_at_the_twilight_estate: returnPosition,
	return_to_the_witching_hour: returnPosition,
	return_to_at_deaths_doorstep: returnPosition,
	return_to_the_secret_name: returnPosition,
	return_to_union_and_disillusion: returnPosition,
	return_to_in_the_clutches_of_chaos: returnPosition,
	the_secret_name: {
		top: percent(2),
		left: percent(-4),
		scale: percent(92),
	},
	secrets_of_the_universe: {
		top: percent(2),
		scale: percent(90),
		left: percent(2),
	},
	return_to_the_wages_of_sin: returnPosition,
} as IconPositionManifest;
