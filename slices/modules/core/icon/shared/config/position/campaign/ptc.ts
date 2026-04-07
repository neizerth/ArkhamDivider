import { percent } from "@/shared/util";
import type { IconPositionManifest } from "../../../model";
import { returnPosition } from "../util";

export default {
	carcosa: {
		top: percent(1),
	},
	return_to_the_path_to_carcosa: returnPosition,
	evil_portents: {
		left: percent(-2),
		scale: percent(89),
	},
	byakhee: {
		left: percent(-1),
		top: percent(3),
	},
	the_stranger: {
		top: percent(1),
		left: percent(2),
		scale: percent(89),
	},
	inhabitants_of_carcosa: {
		left: percent(1),
		top: percent(-1),
		scale: percent(107),
	},
	the_flood_below: {
		top: percent(1),
		left: percent(2),
	},
	the_vortex_above: {
		left: percent(1),
		top: percent(3),
		scale: percent(95),
	},
	delusions: {},
	hauntings: {},
	cult_of_the_yellow_sign: {
		top: percent(-1),
		left: percent(1),
	},
	hasturs_gift: {
		top: percent(2),
		left: percent(4),
	},
	decay_and_filth: {
		top: percent(-1),
		scale: percent(97),
	},
	hasturs_envoys: {
		top: percent(-4),
		scale: percent(90),
	},
	delusory_evils: {},
	maddening_delusions: {},
	neurotic_fear: {
		left: percent(1),
	},
	decaying_reality: {
		top: percent(2),
		left: percent(-2),
	},
	curtain_call: {
		left: percent(1),
	},
	return_to_curtain_call: returnPosition,
	the_last_king: {
		top: percent(3),
		left: percent(1),
		scale: percent(97),
	},
	return_to_the_last_king: returnPosition,
	echoes_of_the_past: {
		top: percent(1),
		scale: percent(93),
	},
	return_to_echoes_of_the_past: returnPosition,
	the_unspeakable_oath: {
		top: percent(-4),
		left: percent(-3),
		scale: percent(97),
	},
	return_to_the_unspeakable_oath: returnPosition,
	a_phantom_of_truth: {
		top: percent(2),
		left: percent(1),
	},
	return_to_the_phantom_of_truth: returnPosition,
	the_pallid_mask: {},
	return_to_the_pallid_mask: returnPosition,
	black_stars_rise: {
		top: percent(-4),
	},
	return_to_black_stars_rise: returnPosition,
	dim_carcosa: {
		top: percent(2),
		left: percent(1),
	},
	return_to_dim_carcosa: returnPosition,
} as IconPositionManifest;
