import { percent } from "@/shared/util";
import type { IconPositionManifest } from "../../../model";
import { returnPosition } from "../util";

export default {
	elder_things: {},
	miasma: {},
	nameless_horrors: {
		left: percent(-1),
		scale: percent(90),
	},
	penguins: {
		left: percent(-2),
	},
	shoggoths: {
		left: percent(-2),
	},
	tekeli_li: returnPosition,
	silence_and_mystery: {
		top: percent(-2),
		left: percent(-2),
		scale: percent(110),
	},
	expedition_team: {
		scale: percent(95),
	},
	agents_of_the_unknown: {},
	left_behind: {
		top: percent(-4),
	},
	ice_and_death: {
		scale: percent(110),
	},
	deadly_weather: {},
	hazards_of_antarctica: {
		left: percent(-4),
	},
	lost_in_the_night: {},
	sleeping_nightmares: {
		top: percent(2),
		scale: percent(115),
	},
	the_heart_of_madness: returnPosition,
	stirring_in_the_deep: {},
	memorials_of_the_lost: {},
	the_crash: {
		top: percent(2),
		left: percent(1),
	},
	to_the_forbidden_peaks: {},
	city_of_the_elder_things: {
		left: percent(-1),
		top: percent(6),
		scale: percent(105),
	},
	the_great_seal: {
		top: percent(4),
		left: percent(2),
		scale: percent(110),
	},
	fatal_mirage: {},
	eoe_campaign: {
		top: percent(2),
		scale: percent(110),
	},
	eoe: {
		top: percent(-1),
		scale: percent(110),
	},
} as IconPositionManifest;
