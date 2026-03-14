import { percent } from "@/shared/util";
import type { IconPositionManifest } from "../../../model";

export default {
	weakness: {
		top: percent(-3),
		left: percent(3),
		scale: percent(95),
	},
	reaction: {
		top: percent(-3),
		left: percent(5),
		scale: percent(85),
	},
	night: {
		top: percent(-3),
		left: percent(-3),
		scale: percent(90),
	},
	guide_bullet: {
		top: percent(-5),
		left: percent(5),
		scale: percent(85),
	},
	free: {
		top: percent(-2),
		left: percent(5),
		scale: percent(85),
	},
	day: {
		top: percent(-3),
		left: percent(3),
		scale: percent(90),
	},
	codex: {
		top: percent(-5),
		left: percent(3),
		scale: percent(85),
	},
	bullet: {
		top: percent(-15),
		left: percent(5),
		scale: percent(115),
	},
	action: {
		top: percent(-3),
		left: percent(5),
		scale: percent(85),
	},
} as IconPositionManifest;
