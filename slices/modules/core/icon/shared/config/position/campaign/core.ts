import { percent } from "@/shared/util";
import type { IconPositionManifest } from "../../../model";
import { returnPosition } from "../common";

export default {
	chilling_cold: {
		left: percent(4),
		top: percent(1),
		scale: percent(90),
	},
	ancient_evils: {
		left: percent(5),
	},
	nightgaunts: {
		left: percent(5),
	},
	striking_fear: {
		top: percent(2),
		left: percent(6),
	},
	ghouls: {
		top: percent(2),
		left: percent(3),
		scale: percent(95),
	},
	agents_of_yog: {
		scale: percent(90),
		left: percent(4),
		top: percent(-5),
	},
	agents_of_shub: {
		top: percent(-2),
		left: percent(4),
		scale: percent(90),
	},
	agents_of_cthulhu: {
		left: percent(4),
	},
	agents_of_hastur: {
		top: percent(-2),
		left: percent(3),
	},
	the_gathering: {
		top: percent(-3),
		scale: percent(90),
	},
	midnight_masks: {
		left: percent(4),
		top: percent(-4),
	},
	the_devourer_below: {
		left: percent(3),
		top: percent(-1),
	},
	dark_cult: {
		left: percent(3),
	},
	locked_doors: {
		left: percent(5),
	},
	cult_of_umordoth: {
		top: percent(-2),
		left: percent(1),
		scale: percent(95),
	},
	ghouls_of_umrdhoth: {
		top: percent(3),
		left: percent(3),
		scale: percent(93),
	},
	the_devourers_cult: {
		left: percent(3),
	},
	rtnotz: returnPosition,
	return_cult: returnPosition,
	return_to_the_gathering: returnPosition,
	return_to_the_midnight_masks: returnPosition,
	return_to_the_devourer_below: returnPosition,
} as IconPositionManifest;
