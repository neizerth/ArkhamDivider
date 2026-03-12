import { percent } from "@/shared/util";
import type { IconPositionManifest } from "../../../model";
import { returnPosition } from "../util";

export default {
	carcosa: {
		top: percent(-1),
		left: percent(4),
	},
	return_to_the_path_to_carcosa: returnPosition,
	evil_portents: {
		left: percent(2),
		top: percent(-2),
		scale: percent(89),
	},
	byakhee: {
		top: percent(1),
		left: percent(3),
	},
	the_stranger: {
		top: percent(-1),
		left: percent(6),
		scale: percent(89),
	},
	inhabitants_of_carcosa: {
		left: percent(5),
		top: percent(-3),
		scale: percent(107),
	},
	the_flood_below: {
		top: percent(-1),
		left: percent(6),
	},
	the_vortex_above: {
		left: percent(5),
		top: percent(1),
		scale: percent(95),
	},
	delusions: {
		left: percent(4),
	},
	hauntings: {
		left: percent(4),
	},
	cult_of_the_yellow_sign: {
		top: percent(-3),
		left: percent(5),
	},
	hasturs_gift: {
		left: percent(8),
	},
	decay_and_filth: {
		top: percent(-3),
		left: percent(4),
		scale: percent(97),
	},
	hasturs_envoys: {
		top: percent(-6),
		left: percent(4),
		scale: percent(90),
	},
	delusory_evils: {
		left: percent(4),
	},
	maddening_delusions: {
		left: percent(4),
	},
	neurotic_fear: {
		top: percent(-2),
		left: percent(5),
	},
	decaying_reality: {
		left: percent(2),
	},
	curtain_call: {
		top: percent(-2),
		left: percent(5),
	},
	return_to_curtain_call: returnPosition,
	the_last_king: {
		top: percent(1),
		left: percent(5),
		scale: percent(97),
	},
	return_to_the_last_king: returnPosition,
	echoes_of_the_past: {
		top: percent(-1),
		left: percent(4),
		scale: percent(93),
	},
	return_to_echoes_of_the_past: returnPosition,
	the_unspeakable_oath: {
		top: percent(-6),
		left: percent(1),
		scale: percent(97),
	},
	return_to_the_unspeakable_oath: returnPosition,
	a_phantom_of_truth: {
		left: percent(5),
	},
	return_to_the_phantom_of_truth: returnPosition,
	the_pallid_mask: {
		left: percent(4),
	},
	return_to_the_pallid_mask: returnPosition,
	black_stars_rise: {
		top: percent(-6),
		left: percent(4),
	},
	return_to_black_stars_rise: returnPosition,
	dim_carcosa: {
		left: percent(5),
	},
	return_to_dim_carcosa: returnPosition,
} as IconPositionManifest;
