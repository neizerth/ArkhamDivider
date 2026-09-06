import { percent } from "@/shared/util";
import type { IconPositionManifest } from "../../../model";

export default {
	blood_moon: {
		scale: percent(100),
	},
	children_of_blood: {
		top: percent(2),
		scale: percent(95),
	},
	hunted: {
		top: percent(2),
		scale: percent(90),
	},
	misinformation: {
		top: percent(2),
		scale: percent(90),
	},
	infected: {
		top: percent(-2),
		scale: percent(90),
	},
	vermin: {
		left: percent(-1),
		scale: percent(90),
	},
	preyed_upon: {
		top: percent(-4),
		left: percent(-1),
		scale: percent(90),
	},
	mongrels: {
		top: percent(-2),
		left: percent(-2),
		scale: percent(90),
	},
	agents_of_zburamoarte: {
		left: percent(-2),
		scale: percent(90),
	},
	friends_in_low_places: {
		top: percent(-4),
		left: percent(1),
		scale: percent(80),
	},
	sanguine_secrets: {
		scale: percent(100),
		top: percent(2),
		left: percent(1),
	},
} as IconPositionManifest;
