import { defaultIconPositionManifest } from "@/modules/core/icon/shared/config";
import { percent } from "@/shared/util";

export const arkhamesqueClassicManifest = defaultIconPositionManifest;

const returnPosition = {
	left: percent(2),
};

const returnPositionIconKeys = [
	"disappearance_at_the_twilight_estate",
	"return_cult",
	"return_to_a_light_in_the_fog",
	"return_to_at_deaths_doorstep",
	"return_to_before_the_black_throne",
	"return_to_black_stars_rise",
	"return_to_blood_on_the_altar",
	"return_to_city_of_archives",
	"return_to_curtain_call",
	"return_to_devil_reef",
	"return_to_dim_carcosa",
	"return_to_disappearance_at_the_twilight_estate",
	"return_to_echoes_of_the_past",
	"return_to_extracurricular_activities",
	"return_to_flooded_caverns",
	"return_to_for_the_greater_good",
	"return_to_horror_in_high_gear",
	"return_to_in_the_clutches_of_chaos",
	"return_to_in_too_deep",
	"return_to_into_the_maelstrom",
	"return_to_knyan",
	"return_to_lost_in_time_and_space",
	"return_to_pillars_of_judgement",
	"return_to_shattered_aeons",
	"return_to_the_boundary_beyond",
	"return_to_the_depths_of_yoth",
	"return_to_the_devourer_below",
	"return_to_the_doom_of_eztli",
	"return_to_the_dunwich_legacy",
	"return_to_the_essex_county_express",
	"return_to_the_forgotten_age",
	"return_to_the_gathering",
	"return_to_the_heart_of_the_elders",
	"return_to_the_house_always_wins",
	"return_to_the_lair_of_dagon",
	"return_to_the_last_king",
	"return_to_the_midnight_masks",
	"return_to_the_miskatonic_museum",
	"return_to_the_pallid_mask",
	"return_to_the_path_to_carcosa",
	"return_to_the_phantom_of_truth",
	"return_to_the_pit_of_despair",
	"return_to_the_rainforest",
	"return_to_the_secret_name",
	"return_to_the_unspeakable_oath",
	"return_to_the_untamed_wilds",
	"return_to_the_vanishing_of_elina_harper",
	"return_to_the_wages_of_sin",
	"return_to_the_witching_hour",
	"return_to_threads_of_fate",
	"return_to_turn_back_time",
	"return_to_undimensioned_and_unseen",
	"return_to_union_and_disillusion",
	"return_to_where_doom_awaits",
	"rtnotz",
	"rttcu",
	"tekeli_li",
	"the_heart_of_madness",
] as const;

const returnPositionEntries = Object.fromEntries(
	returnPositionIconKeys.map((key) => [key, returnPosition]),
);

export const arkhamesqueClassicBottomManifest = {
	...defaultIconPositionManifest,
	...returnPositionEntries,
	rttic: {
		top: percent(-1),
		left: percent(1),
	},
};
