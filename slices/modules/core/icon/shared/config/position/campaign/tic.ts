import { percent } from "@/shared/util";
import type { IconPositionManifest } from "../../../model";
import { returnPosition } from "../util";

export default {
	tic: {
		top: percent(-1),
		left: percent(4),
	},
	rttic: {
		top: percent(-1),
		left: percent(5),
	},
	creatures_from_below: {
		top: percent(-3),
		left: percent(4),
		scale: 0.95,
	},
	flooded_caves: {
		top: percent(-2),
		left: percent(5),
	},
	rising_tide: {
		top: percent(-2),
		left: percent(4),
	},
	syzygy: {
		top: percent(-1),
		left: percent(4),
	},
	agents_of_hydra: {
		top: percent(-1),
		left: percent(4),
	},
	fog_over_innsmouth: {
		top: percent(-5),
		left: percent(4),
		scale: 0.9,
	},
	shattered_memories: {
		top: percent(-1),
		left: percent(4),
	},
	locals: {
		top: percent(1),
		left: percent(4),
	},
	agents_of_dagon: {
		left: percent(1),
	},
	return_to_flooded_caverns: returnPosition,
	innsmouth_haze: {
		top: percent(-2),
		left: percent(4),
		scale: 0.95,
	},
	stalkers_of_cthulhu: {
		top: percent(3),
		left: percent(5),
	},
	barricaded_doors: {
		top: percent(1),
		left: percent(4),
	},
	grotto_of_despair: {
		top: percent(-1),
		left: percent(4),
	},
	return_to_the_pit_of_despair: returnPosition,
	disappearance_of_elina_harper: {
		left: percent(5),
	},
	return_to_the_vanishing_of_elina_harper: returnPosition,
	in_too_deep: {
		top: percent(-4),
		left: percent(4),
	},
	return_to_in_too_deep: returnPosition,
	devil_reef: {
		left: percent(4),
	},
	return_to_devil_reef: returnPosition,
	horror_in_high_gear: {
		top: percent(-1),
		left: percent(4),
		scale: 0.95,
	},
	return_to_horror_in_high_gear: returnPosition,
	a_light_in_the_fog: {
		left: percent(4),
		scale: 0.9,
	},
	return_to_a_light_in_the_fog: returnPosition,
	lair_of_dagon: {
		top: percent(1),
		left: percent(4),
	},
	return_to_the_lair_of_dagon: returnPosition,
	into_the_maelstrom: {
		top: percent(-2),
		left: percent(4),
	},
	return_to_into_the_maelstrom: returnPosition,
} as IconPositionManifest;
