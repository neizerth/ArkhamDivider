import { percent } from "@/shared/util";
import type { IconPositionManifest } from "../../../model";
import { returnPosition } from "../util";

export default {
	set: {
		top: percent(-3),
		left: percent(-3),
		scale: percent(89),
	},
	return_to_the_dunwich_legacy: returnPosition,
	blood_on_the_altar: {
		scale: percent(109),
	},
	dunwich: {
		left: percent(-1),
		scale: percent(93),
	},
	whippoorwills: {},
	naomis_crew: {},
	the_essex_county_express: {
		left: percent(1),
		scale: percent(94),
	},
	the_beyond: {
		left: percent(1),
		scale: percent(92),
	},
	extracurricular_activity: {
		top: percent(-4),
		scale: percent(94),
	},
	sorcery: {
		left: percent(-1),
		top: percent(-2),
		scale: percent(96),
	},
	bishops_thralls: {},
	lost_in_time_and_space: {
		top: percent(2),
		scale: percent(93),
	},
	hideous_abominations: {},
	the_house_always_wins: {
		left: percent(-1),
		top: percent(-2),
	},
	bad_luck: {
		top: percent(1),
	},
	the_miskatonic_museum: {
		top: percent(-2),
	},
	undimensioned_and_unseen: {},
	beast_thralls: {
		top: percent(2),
		scale: percent(95),
	},
	where_doom_awaits: {
		top: percent(-1),
	},
	armitages_fate: {
		top: percent(3),
	},
	return_to_blood_on_the_altar: returnPosition,
	resurgent_evils: {
		top: percent(2),
		left: percent(2),
	},
	return_to_the_essex_county_express: returnPosition,
	beyond_the_threshold: {},
	erratic_fear: {
		top: percent(-2),
	},
	return_to_extracurricular_activities: returnPosition,
	secret_doors: {},
	yog_sothoths_emissaries: {
		top: percent(2),
		left: percent(-2),
	},
	return_to_lost_in_time_and_space: returnPosition,
	return_to_the_house_always_wins: returnPosition,
	return_to_the_miskatonic_museum: returnPosition,
	creeping_cold: {
		top: percent(2),
		left: percent(-2),
	},
	return_to_undimensioned_and_unseen: returnPosition,
	return_to_where_doom_awaits: returnPosition,
} as IconPositionManifest;
