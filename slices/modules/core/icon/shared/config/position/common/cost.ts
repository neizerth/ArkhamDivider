import { percent } from "@/shared/util";
import type { IconPositionManifest } from "../../../model";

export default {
	x: {
		left: percent(-1),
		top: percent(-2),
		scale: percent(80),
	},
	star: {
		top: percent(-1),
		scale: percent(90),
	},
	numNull: {
		left: percent(-1),
		scale: percent(70),
	},
	num9: {
		top: percent(-2),
		left: percent(1),
		scale: percent(90),
	},
	num4: {
		top: percent(-2),
		left: percent(-3),
		scale: percent(90),
	},
	num2: {
		top: percent(-2),
		scale: percent(90),
	},
	num1: {
		top: percent(-2),
		left: percent(-2),
		scale: percent(85),
	},
	num0: {
		left: percent(-1),
		top: percent(-2),
		scale: percent(90),
	},
} as IconPositionManifest;
