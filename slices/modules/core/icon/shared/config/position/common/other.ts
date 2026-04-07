import { percent } from "@/shared/util";
import type { IconPositionManifest } from "../../../model";

export default {
	weakness: {
		left: percent(-1),
		top: percent(-1),
		scale: percent(95),
	},
	reaction: {
		top: percent(-1),
		left: percent(1),
		scale: percent(85),
	},
	night: {
		top: percent(-1),
		left: percent(-7),
		scale: percent(90),
	},
	guide_bullet: {
		top: percent(-3),
		left: percent(1),
		scale: percent(85),
	},
	free: {
		left: percent(1),
		scale: percent(85),
	},
	day: {
		left: percent(-1),
		top: percent(-1),
		scale: percent(90),
	},
	codex: {
		left: percent(-1),
		top: percent(-3),
		scale: percent(85),
	},
	bullet: {
		top: percent(-13),
		left: percent(1),
		scale: percent(115),
	},
	action: {
		top: percent(-1),
		left: percent(1),
		scale: percent(85),
	},
} as IconPositionManifest;
