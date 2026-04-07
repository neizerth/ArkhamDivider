import { percent } from "@/shared/util";
import type { IconPositionManifest } from "../../../model";
import { returnPosition } from "../util";

export default {
	core: {},
	chilling_cold: {
		left: percent(2),
		top: percent(3),
		scale: percent(90),
	},
	ancient_evils: {
		top: percent(2),
		left: percent(1),
	},
	nightgaunts: {
		left: percent(1),
	},
	striking_fear: {
		top: percent(4.5),
		left: percent(3),
	},
	ghouls: {
		left: percent(-1),
		top: percent(4),
		scale: percent(95),
	},
	agents_of_yog: {
		scale: percent(90),
		top: percent(-3),
	},
	agents_of_shub: {
		scale: percent(90),
	},
	agents_of_cthulhu: {},
	agents_of_hastur: {
		left: percent(1),
	},
	the_gathering: {
		left: percent(-4),
		top: percent(-1),
		scale: percent(90),
	},
	midnight_masks: {
		top: percent(-2),
		left: percent(1),
	},
	the_devourer_below: {
		left: percent(1),
		top: percent(1),
	},
	dark_cult: {
		top: percent(2),
		scale: percent(110),
	},
	locked_doors: {
		top: percent(2),
		left: percent(1),
	},
	cult_of_umordoth: {
		left: percent(-1),
		top: percent(-1),
		scale: percent(95),
	},
	ghouls_of_umrdhoth: {
		left: percent(-1),
		top: percent(5),
		scale: percent(93),
	},
	the_devourers_cult: {},
	rtnotz: returnPosition,
	return_cult: returnPosition,
	return_to_the_gathering: returnPosition,
	return_to_the_midnight_masks: returnPosition,
	return_to_the_devourer_below: returnPosition,
} as IconPositionManifest;
