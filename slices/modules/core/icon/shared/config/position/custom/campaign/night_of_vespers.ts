import { percent } from "@/shared/util";
import type { IconPositionManifest } from "../../../../model";
import { prefixIcons } from "../../util";

const icons: IconPositionManifest = {
	the_family: {
		left: percent(-1),
		top: percent(-2),
		scale: percent(110),
	},
	hostile_architecture: {
		left: percent(-1),
		top: percent(-4),
		scale: percent(105),
	},
	inferno: {
		left: percent(-1),
		top: percent(-2),
		scale: percent(130),
	},
	liminal_spaces: {
		left: percent(-1),
		top: percent(-2),
		scale: percent(120),
	},
	agents_of_darkness: {
		scale: percent(125),
	},
	nyctophobia: {
		top: percent(2),
		left: percent(-4),
		scale: percent(110),
	},
	paranormal_activity: {
		left: percent(-1),
		top: percent(-2),
		scale: percent(105),
	},
	the_commission: {
		left: percent(-1),
		top: percent(-2),
		scale: percent(95),
	},
	habeas_corpus: {
		top: percent(-2),
		left: percent(1),
		scale: percent(110),
	},
	vivat_regina: {
		left: percent(-1),
		top: percent(-6),
		scale: percent(115),
	},
	agents_of_tears: {
		left: percent(-1),
		top: percent(-6),
		scale: percent(120),
	},
	agents_of_sighs: {},
	giallo: {
		top: percent(-4),
		scale: percent(95),
	},
	last_dance: {
		top: percent(-4),
		scale: percent(105),
	},
	phenomena: {
		top: percent(-3),
		scale: percent(115),
	},
	sacred_triad: {
		left: percent(-1),
		top: percent(-4),
	},
	threefold_evils: {
		top: percent(-2),
		left: percent(1),
	},
	unhallowed_land: {
		left: percent(-1),
		top: percent(-2),
		scale: percent(105),
	},
	astral_crossroads: {
		top: percent(-1),
		scale: percent(120),
	},
	astral_justice: {
		top: percent(-2),
		scale: percent(125),
	},
	astral_requital: {
		top: percent(-1),
		scale: percent(110),
	},
	megapolisomancy: {
		top: percent(4),
		scale: percent(115),
	},
	tenebrae: {
		top: percent(-4),
		left: percent(-2),
		scale: percent(120),
	},
	trauma: {
		top: percent(-1),
		left: percent(2),
		scale: percent(110),
	},
	the_end_of_seasons: {
		top: percent(2),
		left: percent(-4),
		scale: percent(110),
	},
	behind_closed_doors: {
		top: percent(2),
		left: percent(-1),
		scale: percent(110),
	},
	dancing_with_death: {
		top: percent(-1),
		scale: percent(105),
	},
	the_teachings_of_aradia: {
		top: percent(-1),
	},
	the_city_of_fog: {
		left: percent(-1),
		top: percent(1),
	},
	the_garden_of_bones: {
		top: percent(3),
		left: percent(-2),
		scale: percent(110),
	},
	a_chorus_of_suffering: {
		top: percent(-2),
		scale: percent(110),
	},
	mothers_mercy: {
		left: percent(-1),
		top: percent(-1),
		scale: percent(135),
	},
};

const prefixedIcons = prefixIcons("night_of_vespers", icons);

export default {
	night_of_vespers: {
		top: percent(-2),
		scale: percent(90),
	},
	...prefixedIcons,
} as IconPositionManifest;
