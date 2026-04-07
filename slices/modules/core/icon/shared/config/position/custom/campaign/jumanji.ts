import { percent } from "@/shared/util";
import type { IconPositionManifest } from "../../../../model";
import { prefixIcons } from "../../util";

const icons: IconPositionManifest = {
	call_of_jumanji: {
		left: percent(-5),
	},
	bats: {
		left: percent(-1),
		top: percent(1),
		scale: percent(90),
	},
	spreading_wilds: {
		left: percent(-4),
		top: percent(-2),
		scale: percent(97),
	},
	jungle_spirits: {
		top: percent(-2),
		left: percent(2),
		scale: percent(95),
	},
	lions: {},
	primal_influence: {
		left: percent(-1),
		top: percent(-2),
	},
	wilderness_training: {
		top: percent(-2),
		left: percent(-2),
		scale: percent(90),
	},
	gameplay: {
		top: percent(-2),
		scale: percent(95),
	},
	hunter: {
		top: percent(-2),
		scale: percent(110),
	},
	home_invasion: {
		top: percent(1),
		left: percent(2),
		scale: percent(95),
	},
	urban_jungle: {},
	game_night: {},
	force_of_nature: {
		top: percent(-2),
		scale: percent(90),
	},
};
const prefixedIcons = prefixIcons("jumanji", icons);

export default {
	jumanji: {
		left: percent(-1),
		top: percent(1),
		scale: percent(90),
	},
	...prefixedIcons,
} as IconPositionManifest;
