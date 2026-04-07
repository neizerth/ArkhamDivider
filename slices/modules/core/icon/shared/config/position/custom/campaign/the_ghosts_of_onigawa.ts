import { percent } from "@/shared/util";
import type { IconPositionManifest } from "../../../../model";
import { prefixIcons } from "../../util";

const icons: IconPositionManifest = {
	astral_armaments: {
		top: percent(-2),
		left: percent(-3),
		scale: percent(95),
	},
	cruel_corvids: {
		left: percent(-1),
		top: percent(-3),
		scale: percent(95),
	},
	cursed_conductors: {
		left: percent(-4),
		top: percent(-5),
	},
	darkened_manor: {
		left: percent(-1),
		top: percent(-2),
		scale: percent(95),
	},
	deadly_doctrines: {
		left: percent(-4),
		top: percent(-2),
		scale: percent(95),
	},
	downwell: {
		left: percent(-1),
		scale: percent(95),
	},
	fearsome_fog: {
		left: percent(-1),
		top: percent(-3),
		scale: percent(95),
	},
	fiery_fate: {
		left: percent(-1),
		top: percent(-8),
		scale: percent(90),
	},
	forest_frights: {
		left: percent(-1),
		top: percent(-2),
	},
	forged_in_flames: {
		left: percent(-1),
	},
	ghostly_grudges: {
		top: percent(-5),
		left: percent(4),
		scale: percent(95),
	},
	gifts_ungiven: {
		left: percent(-1),
		top: percent(-2),
	},
	guardians_of_minakami: {
		left: percent(-1),
		top: percent(-4),
		scale: percent(95),
	},
	handy_horrors: {
		left: percent(-3),
		scale: percent(110),
	},
	lunar_lunacy: {
		left: percent(-1),
		top: percent(-8),
		scale: percent(95),
	},
	memories_of_mayu: {
		left: percent(1),
	},
	moonlit_madness: {
		left: percent(-4),
		top: percent(1),
	},
	siege_of_onigawa: {
		left: percent(-1),
	},
	slumbering_serpents: {
		left: percent(-1),
	},
	sunken_kingdom: {
		left: percent(-1),
		top: percent(-3),
	},
	the_shepherds_flock: {
		left: percent(-1),
		scale: percent(85),
	},
	tidal_terrors: {
		left: percent(-1),
		top: percent(-2),
	},
	watery_woes: {
		left: percent(-1),
		top: percent(-1),
	},
	winds_of_winter: {
		left: percent(-1),
		top: percent(-2),
		scale: percent(105),
	},
	the_hidden_village: {
		left: percent(-1),
		scale: percent(95),
	},
	the_house_on_the_hill: {
		left: percent(-1),
		top: percent(-6),
	},
	the_river_delta: {
		left: percent(-1),
		scale: percent(95),
	},
	the_war_eternal: {
		left: percent(-1),
		scale: percent(95),
	},
	half_light: {
		left: percent(-1),
		top: percent(-2),
		scale: percent(95),
	},
	the_end_of_august: {
		left: percent(-1),
		top: percent(-6),
		scale: percent(95),
	},
	the_molten_armory: {
		left: percent(-1),
		top: percent(-2),
		scale: percent(90),
	},
	the_black_harvest: {
		left: percent(-1),
		top: percent(-4),
		scale: percent(95),
	},
};

const prefixedIcons = prefixIcons("the_ghosts_of_onigawa", icons);

export default {
	the_ghosts_of_onigawa: {
		left: percent(-1),
		top: percent(1),
		scale: percent(85),
	},
	...prefixedIcons,
} as IconPositionManifest;
