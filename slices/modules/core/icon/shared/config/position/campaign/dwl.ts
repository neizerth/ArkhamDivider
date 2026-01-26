import { percent } from "@/shared/util";
import type { IconPositionManifest } from "../../../model";
import { returnPosition } from "../common";

export default {
	set: {
		top: percent(-5),
		left: percent(1),
		scale: percent(89),
	},
	return_to_the_dunwich_legacy: returnPosition,
	blood_on_the_altar: {
		top: percent(-2),
		left: percent(5),
		scale: percent(109),
	},
	dunwich: {
		top: percent(-2),
		left: percent(3),
		scale: percent(93),
	},
	whippoorwills: {
		left: percent(4),
	},
	naomis_crew: {
		left: percent(4),
	},
	the_essex_county_express: {
		left: percent(5),
		top: percent(-2),
		scale: percent(94),
	},
	the_beyond: {
		left: percent(5),
		top: percent(-2),
		scale: percent(92),
	},
	extracurricular_activity: {
		left: percent(4),
		top: percent(-6),
		scale: percent(94),
	},
	sorcery: {
		left: percent(3),
		top: percent(-4),
		scale: percent(96),
	},
	bishops_thralls: {
		left: percent(4),
	},
	lost_in_time_and_space: {
		left: percent(4),
		scale: percent(93),
	},
	hideous_abominations: {
		left: percent(4),
	},
	the_house_always_wins: {
		left: percent(5),
		top: percent(-4),
	},
	bad_luck: {
		left: percent(4),
		top: percent(-1),
	},
	the_miskatonic_museum: {
		left: percent(4),
		top: percent(-4),
	},
	undimensioned_and_unseen: {
		left: percent(4),
	},
	beast_thralls: {
		left: percent(4),
		scale: percent(95),
	},
	where_doom_awaits: {
		left: percent(4),
		top: percent(-3),
	},
	armitages_fate: {
		left: percent(4),
		top: percent(1),
	},
	return_to_blood_on_the_altar: returnPosition,
	resurgent_evils: {
		left: percent(6),
	},
	return_to_the_essex_county_express: returnPosition,
	beyond_the_threshold: {
		left: percent(4),
	},
	erratic_fear: {
		left: percent(4),
		top: percent(-4),
	},
	return_to_extracurricular_activities: returnPosition,
	secret_doors: {
		left: percent(4),
	},
	yog_sothoths_emissaries: {
		left: percent(2),
	},
	return_to_lost_in_time_and_space: returnPosition,
	return_to_the_house_always_wins: returnPosition,
	return_to_the_miskatonic_museum: returnPosition,
	creeping_cold: {
		left: percent(2),
	},
	return_to_undimensioned_and_unseen: returnPosition,
	return_to_where_doom_awaits: returnPosition,
} as IconPositionManifest;
