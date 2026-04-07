import { percent } from "@/shared/util";
import type { IconPositionManifest } from "../../../../model";
import { prefixIcons } from "../../util";

const icons: IconPositionManifest = {
	mysterious_passengers: {
		left: percent(-1),
		top: percent(-2),
	},
	gaze_of_the_north: {
		left: percent(-1),
		top: percent(-2),
		scale: percent(95),
	},
	snowblind: {
		left: percent(-1),
		top: percent(-2),
		scale: percent(90),
	},
	dark_forest: {
		left: percent(-1),
		top: percent(-2),
	},
	pursuit: {
		left: percent(-1),
		top: percent(-3),
	},
	gnoph_keh: {
		left: percent(-1),
		top: percent(3),
		scale: percent(90),
	},
	blizzard: {
		left: percent(-1),
		top: percent(-6),
		scale: percent(95),
	},
	hidden_motivations: {
		left: percent(-1),
		top: percent(-2),
	},
	frozen_tracks: {
		left: percent(-1),
		top: percent(-2),
		scale: percent(85),
	},
	stranded_in_the_urals: {
		top: percent(2),
		left: percent(-1),
		scale: percent(105),
	},
	the_forgotten_village: {
		left: percent(-1),
		top: percent(-3),
		scale: percent(90),
	},
};

const prefixedIcons = prefixIcons("winter_winds", icons);

export default {
	winter_winds: {
		left: percent(-1),
		top: percent(-2),
		scale: percent(85),
	},
	...prefixedIcons,
} as IconPositionManifest;
