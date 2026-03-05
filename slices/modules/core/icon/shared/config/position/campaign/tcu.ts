import { percent } from "@/shared/util";
import type { IconPositionManifest } from "../../../model";
import { returnPosition } from "../util";

export default {
	spectral_predators: {
		top: percent(-1),
		left: percent(3),
	},
	the_watcher: {
		top: percent(-1),
		left: percent(4),
		scale: 0.85,
	},
	music_of_the_damned: {
		top: percent(3),
		left: percent(5),
	},
	agents_of_azathoth: {
		left: percent(6),
		top: percent(-3),
		scale: 1.1,
	},
	anettes_coven: {
		top: percent(-2),
		left: percent(4),
	},
	witchcraft: {
		top: percent(-2),
		left: percent(4),
	},
	unspeakable_fate: {
		top: percent(-4),
		left: percent(6),
	},
	spectral_realm: {
		left: percent(4),
	},
	trapped_spirits: {
		top: percent(-3),
		left: percent(5),
	},
	bloodthirsty_spirits: {
		top: percent(-1),
		left: percent(4),
	},
	cold_fog: {
		top: percent(1),
		left: percent(4),
	},
	threatening_evil: {
		top: percent(-1),
		left: percent(6),
		scale: 1.05,
	},
	city_of_the_damned: {
		top: percent(4),
		left: percent(5),
	},
	the_circle_undone: {
		left: percent(4),
		scale: 0.9,
	},
	inexorable_fate: {
		left: percent(3),
	},
	realm_of_death: {
		left: percent(5),
		top: percent(1),
	},
	witchwork: {
		left: percent(4.5),
		top: percent(-2),
		scale: 0.9,
	},
	the_witching_hour: {
		left: percent(4),
	},
	at_deaths_doorstep: {
		top: percent(-1),
		left: percent(4),
	},
	silver_twilight_lodge: {
		top: percent(2),
		left: percent(5),
	},
	the_wages_of_sin: {
		left: percent(1),
		scale: 0.9,
	},
	city_of_sins: {
		top: percent(3),
		left: percent(-6),
	},
	for_the_greater_good: {
		top: percent(-1),
		left: percent(4),
		scale: 0.87,
	},
	return_to_for_the_greater_good: returnPosition,
	union_and_disillusion: {
		left: percent(5),
	},
	in_the_clutches_of_chaos: {
		top: percent(1),
	},
	before_the_black_throne: {
		left: percent(3),
	},
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
		scale: 0.92,
	},
	secrets_of_the_universe: {
		scale: 0.9,
		left: percent(6),
	},
	return_to_the_wages_of_sin: returnPosition,
} as IconPositionManifest;
