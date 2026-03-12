import { percent } from "@/shared/util";
import type { IconPositionManifest } from "../../../../model";
import { prefixIcons } from "../../util";

const icons: IconPositionManifest = {
	the_family: {
		top: percent(-4),
		left: percent(3),
		scale: percent(110),
	},
	hostile_architecture: {
		top: percent(-6),
		left: percent(3),
		scale: percent(105),
	},
	inferno: {
		top: percent(-4),
		left: percent(3),
		scale: percent(130),
	},
	liminal_spaces: {
		top: percent(-4),
		left: percent(3),
		scale: percent(120),
	},
	agents_of_darkness: {
		top: percent(-2),
		left: percent(4),
		scale: percent(125),
	},
	nyctophobia: {
		scale: percent(110),
	},
	paranormal_activity: {
		top: percent(-4),
		left: percent(3),
		scale: percent(105),
	},
	the_commission: {
		top: percent(-4),
		left: percent(3),
		scale: percent(95),
	},
	habeas_corpus: {
		top: percent(-4),
		left: percent(5),
		scale: percent(110),
	},
	vivat_regina: {
		top: percent(-8),
		left: percent(3),
		scale: percent(115),
	},
	agents_of_tears: {
		top: percent(-8),
		left: percent(3),
		scale: percent(120),
	},
	agents_of_sighs: {
		left: percent(3),
	},
	giallo: {
		top: percent(-6),
		left: percent(4),
		scale: percent(95),
	},
	last_dance: {
		top: percent(-6),
		left: percent(4),
		scale: percent(105),
	},
	phenomena: {
		top: percent(-5),
		left: percent(4),
		scale: percent(115),
	},
	sacred_triad: {
		top: percent(-6),
		left: percent(3),
	},
	threefold_evils: {
		top: percent(-4),
		left: percent(5),
	},
	unhallowed_land: {
		top: percent(-4),
		left: percent(3),
		scale: percent(105),
	},
	astral_crossroads: {
		top: percent(-3),
		left: percent(4),
		scale: percent(120),
	},
	astral_justice: {
		top: percent(-4),
		left: percent(4),
		scale: percent(125),
	},
	astral_requital: {
		top: percent(-3),
		left: percent(4),
		scale: percent(110),
	},
	megapolisomancy: {
		top: percent(2),
		left: percent(4),
		scale: percent(115),
	},
	tenebrae: {
		top: percent(-6),
		left: percent(2),
		scale: percent(120),
	},
	trauma: {
		top: percent(-3),
		left: percent(6),
		scale: percent(110),
	},
	the_end_of_seasons: {
		scale: percent(110),
	},
	behind_closed_doors: {
		left: percent(3),
		scale: percent(110),
	},
	dancing_with_death: {
		top: percent(-3),
		left: percent(4),
		scale: percent(105),
	},
	the_teachings_of_aradia: {
		top: percent(-3),
		left: percent(4),
	},
	the_city_of_fog: {
		top: percent(-1),
		left: percent(3),
	},
	the_garden_of_bones: {
		top: percent(1),
		left: percent(2),
		scale: percent(110),
	},
	a_chorus_of_suffering: {
		top: percent(-4),
		left: percent(4),
		scale: percent(110),
	},
	mothers_mercy: {
		top: percent(-3),
		left: percent(3),
		scale: percent(135),
	},
};

const prefixedIcons = prefixIcons("night_of_vespers", icons);

export default {
	night_of_vespers: {
		top: percent(-4),
		left: percent(4),
		scale: percent(90),
	},
	...prefixedIcons,
} as IconPositionManifest;
