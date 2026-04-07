import { percent } from "@/shared/util";
import type { IconPositionManifest } from "../../../model";
import { returnPosition } from "../util";

export default {
	the_forgotten_age: {
		left: percent(1),
	},
	return_to_the_forgotten_age: returnPosition,
	agents_of_yig: {
		top: percent(2),
		left: percent(2),
		scale: percent(97),
	},
	yigs_venom: {
		left: percent(-2),
		scale: percent(95),
	},
	temporal_flux: {
		top: percent(2),
		scale: percent(93),
	},
	deadly_traps: {
		top: percent(-2),
		scale: percent(98),
	},
	forgotten_ruins: {},
	poison: {
		top: percent(2),
		left: percent(1),
	},
	pillars_of_judgement: {
		left: percent(-1),
		top: percent(-2),
	},
	rainforest: {
		top: percent(2),
		left: percent(1),
		scale: percent(87),
	},
	serpents: {
		top: percent(-1),
	},
	expedition: {
		left: percent(1),
		scale: percent(105),
	},
	knyan: {
		top: percent(2),
		scale: percent(105),
	},
	pnakotic_brotherhood: {
		top: percent(2),
		scale: percent(105),
	},
	return_to_pillars_of_judgement: returnPosition,
	return_to_the_rainforest: returnPosition,
	doomed_expedition: {},
	return_to_knyan: returnPosition,
	venomous_hate: {},
	temporal_hunters: {
		top: percent(2),
		left: percent(1),
		scale: percent(105),
	},
	cult_of_pnakotus: {
		top: percent(1),
		scale: percent(85),
	},
	the_untamed_wilds: {
		top: percent(4),
		left: percent(1),
		scale: percent(97),
	},
	return_to_the_untamed_wilds: returnPosition,
	the_doom_of_eztli: {
		top: percent(2),
		left: percent(1),
	},
	return_to_the_doom_of_eztli: returnPosition,
	threads_of_fate: {
		top: percent(2),
		scale: percent(95),
	},
	return_to_threads_of_fate: returnPosition,
	the_boundary_beyond: {
		top: percent(-4),
		scale: percent(90),
	},
	return_to_the_boundary_beyond: returnPosition,
	heart_of_the_elders: {
		top: percent(-2),
		left: percent(1),
	},
	return_to_the_heart_of_the_elders: returnPosition,
	city_of_archives: {},
	return_to_city_of_archives: returnPosition,
	the_depths_of_yoth: {
		top: percent(7),
	},
	return_to_the_depths_of_yoth: returnPosition,
	shattered_aeons: {
		top: percent(2),
		left: percent(1),
	},
	return_to_shattered_aeons: returnPosition,
	turn_back_time: {},
	return_to_turn_back_time: returnPosition,
} as IconPositionManifest;
