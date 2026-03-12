import { percent } from "@/shared/util";
import type { IconPositionManifest } from "../../../../model";
import { prefixIcons } from "../../util";

const icons: IconPositionManifest = {
	call_of_jumanji: {
		top: percent(-2),
		left: percent(-1),
	},
	bats: {
		top: percent(-1),
		left: percent(3),
		scale: percent(90),
	},
	spreading_wilds: {
		top: percent(-4),
		scale: percent(97),
	},
	jungle_spirits: {
		top: percent(-4),
		left: percent(6),
		scale: percent(95),
	},
	lions: {
		top: percent(-2),
		left: percent(4),
	},
	primal_influence: {
		top: percent(-4),
		left: percent(3),
	},
	wilderness_training: {
		top: percent(-4),
		left: percent(2),
		scale: percent(90),
	},
	gameplay: {
		top: percent(-4),
		left: percent(4),
		scale: percent(95),
	},
	hunter: {
		top: percent(-4),
		left: percent(4),
		scale: percent(110),
	},
	home_invasion: {
		top: percent(-1),
		left: percent(6),
		scale: percent(95),
	},
	urban_jungle: {
		left: percent(4),
	},
	game_night: {
		left: percent(3),
	},
	force_of_nature: {
		top: percent(-4),
		left: percent(4),
		scale: percent(90),
	},
};
const prefixedIcons = prefixIcons("jumanji", icons);

export default {
	jumanji: {
		top: percent(-1),
		left: percent(3),
		scale: percent(90),
	},
	...prefixedIcons,
} as IconPositionManifest;
