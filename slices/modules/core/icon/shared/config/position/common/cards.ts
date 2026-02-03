import { percent } from "@/shared/util";
import type { IconPositionManifest } from "../../../model";

export default {
	asset: {
		top: percent(-3),
		left: percent(3),
		scale: 0.94,
	},
	event: {
		top: percent(-3),
		left: percent(5),
		scale: 0.95,
	},
	skill: {
		top: percent(-1),
		left: percent(4),
	},
	bonded: {
		left: percent(4),
		scale: 0.87,
	},
	upgrade: {
		top: percent(-4),
		left: percent(4),
		scale: 0.9,
	},
	weakness: {
		top: percent(1),
		left: percent(4),
		scale: 0.97,
	},
	list: {
		scale: 0.7,
	},
	pencil: {
		scale: 0.85,
		top: percent(-2),
		left: percent(4),
	},
	ally_inverted: {
		scale: 0.95,
		top: percent(-3),
		left: percent(3),
	},
	arcane_x2_inverted: {
		scale: 0.97,
		top: percent(-1),
		left: percent(3),
	},
	arcane_inverted: {
		left: percent(4),
	},
	accessory_inverted: {
		top: percent(1),
		left: percent(12),
	},
	body_inverted: {
		top: percent(-3),
		left: percent(4),
	},
	hand_inverted: {
		left: percent(5),
	},
	hand_x2_inverted: {
		top: percent(-2),
		left: percent(4),
	},
} as IconPositionManifest;
