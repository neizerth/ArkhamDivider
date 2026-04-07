import { percent } from "@/shared/util";
import type { IconPositionManifest } from "../../../model";
import { returnPosition } from "../util";

export default {
	tic: {
		top: percent(1),
	},
	rttic: {
		top: percent(1),
		left: percent(1),
	},
	creatures_from_below: {
		top: percent(-1),
		scale: percent(95),
	},
	flooded_caves: {
		left: percent(1),
	},
	rising_tide: {},
	syzygy: {
		top: percent(1),
	},
	agents_of_hydra: {
		top: percent(1),
	},
	fog_over_innsmouth: {
		top: percent(-3),
		scale: percent(90),
	},
	shattered_memories: {
		top: percent(1),
	},
	locals: {
		top: percent(3),
	},
	agents_of_dagon: {
		top: percent(2),
		left: percent(-3),
	},
	return_to_flooded_caverns: returnPosition,
	innsmouth_haze: {
		scale: percent(95),
	},
	stalkers_of_cthulhu: {
		top: percent(5),
		left: percent(1),
	},
	barricaded_doors: {
		top: percent(3),
	},
	grotto_of_despair: {
		top: percent(-1),
		scale: percent(85),
	},
	return_to_the_pit_of_despair: returnPosition,
	disappearance_of_elina_harper: {},
	return_to_the_vanishing_of_elina_harper: returnPosition,
	in_too_deep: {
		top: percent(-3),
		scale: percent(85),
	},
	return_to_in_too_deep: returnPosition,
	devil_reef: {},
	return_to_devil_reef: returnPosition,
	horror_in_high_gear: {
		top: percent(1),
		scale: percent(95),
	},
	return_to_horror_in_high_gear: returnPosition,
	a_light_in_the_fog: {
		top: percent(2),
		scale: percent(90),
	},
	return_to_a_light_in_the_fog: returnPosition,
	lair_of_dagon: {
		top: percent(3),
	},
	return_to_the_lair_of_dagon: returnPosition,
	into_the_maelstrom: {},
	return_to_into_the_maelstrom: returnPosition,
} as IconPositionManifest;
