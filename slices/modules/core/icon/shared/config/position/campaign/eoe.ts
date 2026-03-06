import { percent } from "@/shared/util";
import type { IconPositionManifest } from "../../../model";
import { returnPosition } from "../util";

export default {
	elder_things: {
		left: percent(4),
	},
	miasma: {
		left: percent(4),
	},
	nameless_horrors: {
		top: percent(-2),
		left: percent(3),
		scale: 0.9,
	},
	penguins: {
		top: percent(-2),
		left: percent(2),
	},
	shoggoths: {
		top: percent(-2),
		left: percent(2),
	},
	tekeli_li: returnPosition,
	silence_and_mystery: {
		top: percent(-4),
		left: percent(2),
		scale: 1.1,
	},
	expedition_team: {
		top: percent(-2),
		left: percent(4),
		scale: 0.95,
	},
	agents_of_the_unknown: {
		left: percent(4),
	},
	left_behind: {
		top: percent(-6),
		left: percent(4),
	},
	ice_and_death: {
		top: percent(-2),
		left: percent(4),
		scale: 1.1,
	},
	deadly_weather: {
		top: percent(-2),
		left: percent(4),
	},
	hazards_of_antarctica: {
		top: percent(-2),
	},
	lost_in_the_night: {
		left: percent(3),
	},
	sleeping_nightmares: {
		left: percent(4),
		scale: 1.15,
	},
	the_heart_of_madness: returnPosition,
	stirring_in_the_deep: {
		left: percent(4),
	},
	memorials_of_the_lost: {
		top: percent(-2),
		left: percent(4),
	},
	the_crash: {
		left: percent(5),
	},
	to_the_forbidden_peaks: {
		left: percent(4),
	},
	city_of_the_elder_things: {
		top: percent(4),
		left: percent(3),
		scale: 1.05,
	},
	the_great_seal: {
		top: percent(2),
		left: percent(6),
		scale: 1.1,
	},
	fatal_mirage: {
		left: percent(3),
	},
	eoe_campaign: {
		left: percent(4),
		scale: 1.1,
	},
	eoe: {
		top: percent(-3),
		left: percent(4),
		scale: 1.1,
	},
} as IconPositionManifest;
