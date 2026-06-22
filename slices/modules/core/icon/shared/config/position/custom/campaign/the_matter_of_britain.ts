import { percent } from "@/shared/util";
import type { IconPositionManifest } from "../../../../model";
import { prefixIcons } from "../../util";

const icons: IconPositionManifest = {
	a_most_magnificent_court: {
		scale: percent(85),
	},
	arthurian_relics: {
		top: percent(4),
	},
	black_knight: {
		scale: percent(90),
	},
	country_locals: {
		scale: percent(90),
	},
	dark_forest: {
		top: percent(4),
	},
	fairies: {
		top: percent(-4),
		scale: percent(90),
	},
	fellowship_of_the_knights_of_the_round_table: {
		top: percent(3),
	},
	forest_creatures: {
		top: percent(-6),
		left: percent(-3),
		scale: percent(95),
	},
	knights: {},
	lac_diane: {},
	london_calling: {
		top: percent(-1),
		scale: percent(90),
	},
	metropolitan_police: {
		top: percent(-4),
	},
	morgan_le_fey: {},
	prophetiae_merlini: {
		scale: percent(85),
	},
	the_cave_of_fruit_trees: {
		top: percent(-4),
		scale: percent(90),
	},
	the_ill_made_knight: {
		scale: percent(85),
	},
	the_once_and_future_king: {
		scale: percent(85),
	},
	the_queen_of_air_and_darkness: {
		top: percent(4),
		scale: percent(90),
	},
};

const prefixedIcons = prefixIcons("the_matter_of_britain", icons);

export default {
	the_matter_of_britain: {},
	...prefixedIcons,
} as IconPositionManifest;
