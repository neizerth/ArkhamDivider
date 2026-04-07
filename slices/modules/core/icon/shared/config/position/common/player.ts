import { percent } from "@/shared/util";
import type { IconPositionManifest } from "../../../model";

export default {
	asset: {
		top: percent(-1),
		scale: percent(94),
	},
	event: {
		left: percent(-1),
		top: percent(-1),
		scale: percent(95),
	},
	skill: {
		top: percent(1),
	},
	bonded: {
		top: percent(2),
		scale: percent(87),
	},
	upgrade: {
		left: percent(-1),
		top: percent(-2),
		scale: percent(90),
	},
	cog: {
		top: percent(1),
	},
	weakness: {
		top: percent(3),
		scale: percent(97),
	},
	pencil: {
		scale: percent(85),
	},
	ally: {
		left: percent(-1),
		scale: percent(95),
		top: percent(-3),
	},
	ally_inverted: {
		left: percent(-1),
		scale: percent(95),
		top: percent(-3),
	},
	tarot: {
		left: percent(-1),
		top: percent(-1),
		scale: percent(85),
	},
	tarot_inverted: {
		left: percent(-1),
		top: percent(-1),
		scale: percent(85),
	},
	arcane_x2: {
		left: percent(-1),
		scale: percent(97),
	},
	arcane_x2_inverted: {
		left: percent(-1),
		scale: percent(97),
	},
	arcane: {
		left: percent(-1),
		top: percent(-1),
	},
	arcane_inverted: {
		left: percent(-1),
		top: percent(-1),
	},
	accessory: {
		top: percent(-2),
		left: percent(4),
		scale: percent(97),
	},
	accessory_inverted: {
		top: percent(-2),
		left: percent(4),
		scale: percent(97),
	},
	body: {
		left: percent(-1),
		top: percent(-1),
		scale: percent(103),
	},
	body_inverted: {
		left: percent(-1),
		top: percent(-1),
		scale: percent(103),
	},
	head: {
		top: percent(-7),
		scale: percent(90),
	},
	head_inverted: {
		top: percent(-7),
		scale: percent(90),
	},
	hand_inverted: {
		top: percent(-1),
		left: percent(1),
		scale: percent(95),
	},
	hand_x2_inverted: {
		left: percent(-1),
		top: percent(-2),
		scale: percent(95),
	},
	skull: {
		top: percent(1),
		scale: percent(95),
	},
	hand: {
		top: percent(-1),
		left: percent(1),
		scale: percent(95),
	},
	hand_x2: {
		left: percent(-1),
		top: percent(-2),
		scale: percent(95),
	},
} as IconPositionManifest;
