import { percent } from "@/shared/util";
import type { IconPositionManifest } from "../../../../model";
import { prefixIcons } from "../../util";

const icons: IconPositionManifest = {
	mysterious_passengers: {
		top: percent(-4),
		left: percent(3),
	},
	gaze_of_the_north: {
		top: percent(-4),
		left: percent(3),
		scale: percent(95),
	},
	snowblind: {
		top: percent(-4),
		left: percent(3),
		scale: percent(90),
	},
	dark_forest: {
		top: percent(-4),
		left: percent(3),
	},
	pursuit: {
		top: percent(-5),
		left: percent(3),
	},
	gnoph_keh: {
		top: percent(1),
		left: percent(3),
		scale: percent(90),
	},
	blizzard: {
		top: percent(-8),
		left: percent(3),
		scale: percent(95),
	},
	hidden_motivations: {
		top: percent(-4),
		left: percent(3),
	},
	frozen_tracks: {
		top: percent(-4),
		left: percent(3),
		scale: percent(85),
	},
	stranded_in_the_urals: {
		left: percent(3),
		scale: percent(105),
	},
	the_forgotten_village: {
		top: percent(-5),
		left: percent(3),
		scale: percent(90),
	},
};

const prefixedIcons = prefixIcons("winter_winds", icons);

export default {
	winter_winds: {
		top: percent(-4),
		left: percent(3),
		scale: percent(85),
	},
	...prefixedIcons,
} as IconPositionManifest;
