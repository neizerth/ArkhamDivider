import { percent } from "@/shared/util";
import type { IconPositionManifest } from "../../../../model";
import { prefixIcons } from "../../util";

const icons: IconPositionManifest = {
	astral_armaments: {
		top: percent(-4),
		left: percent(1),
		scale: percent(95),
	},
	cruel_corvids: {
		top: percent(-5),
		left: percent(3),
		scale: percent(95),
	},
	cursed_conductors: {
		top: percent(-7),
	},
	darkened_manor: {
		top: percent(-4),
		left: percent(3),
		scale: percent(95),
	},
	deadly_doctrines: {
		top: percent(-4),
		scale: percent(95),
	},
	downwell: {
		top: percent(-2),
		left: percent(3),
		scale: percent(95),
	},
	fearsome_fog: {
		top: percent(-5),
		left: percent(3),
		scale: percent(95),
	},
	fiery_fate: {
		top: percent(-10),
		left: percent(3),
		scale: percent(90),
	},
	forest_frights: {
		top: percent(-4),
		left: percent(3),
	},
	forged_in_flames: {
		top: percent(-2),
		left: percent(3),
	},
	ghostly_grudges: {
		top: percent(-7),
		left: percent(8),
		scale: percent(95),
	},
	gifts_ungiven: {
		top: percent(-4),
		left: percent(3),
	},
	guardians_of_minakami: {
		top: percent(-6),
		left: percent(3),
		scale: percent(95),
	},
	handy_horrors: {
		top: percent(-2),
		left: percent(1),
		scale: percent(110),
	},
	lunar_lunacy: {
		top: percent(-10),
		left: percent(3),
		scale: percent(95),
	},
	memories_of_mayu: {
		top: percent(-2),
		left: percent(5),
	},
	moonlit_madness: {
		top: percent(-1),
	},
	siege_of_onigawa: {
		top: percent(-2),
		left: percent(3),
	},
	slumbering_serpents: {
		top: percent(-2),
		left: percent(3),
	},
	sunken_kingdom: {
		top: percent(-5),
		left: percent(3),
	},
	the_shepherds_flock: {
		top: percent(-2),
		left: percent(3),
		scale: percent(85),
	},
	tidal_terrors: {
		top: percent(-4),
		left: percent(3),
	},
	watery_woes: {
		top: percent(-3),
		left: percent(3),
	},
	winds_of_winter: {
		top: percent(-4),
		left: percent(3),
		scale: percent(105),
	},
	the_hidden_village: {
		top: percent(-2),
		left: percent(3),
		scale: percent(95),
	},
	the_house_on_the_hill: {
		top: percent(-8),
		left: percent(3),
	},
	the_river_delta: {
		top: percent(-2),
		left: percent(3),
		scale: percent(95),
	},
	the_war_eternal: {
		top: percent(-2),
		left: percent(3),
		scale: percent(95),
	},
	half_light: {
		top: percent(-4),
		left: percent(3),
		scale: percent(95),
	},
	the_end_of_august: {
		top: percent(-8),
		left: percent(3),
		scale: percent(95),
	},
	the_molten_armory: {
		top: percent(-4),
		left: percent(3),
		scale: percent(90),
	},
	the_black_harvest: {
		top: percent(-6),
		left: percent(3),
		scale: percent(95),
	},
};

const prefixedIcons = prefixIcons("the_ghosts_of_onigawa", icons);

export default {
	the_ghosts_of_onigawa: {
		top: percent(-1),
		left: percent(3),
		scale: percent(85),
	},
	...prefixedIcons,
} as IconPositionManifest;
