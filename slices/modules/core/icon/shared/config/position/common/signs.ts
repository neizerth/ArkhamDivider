import { percent } from "@/shared/util";
import type { IconPositionManifest } from "../../../model";

const signPosition = {
	top: percent(-3),
	left: percent(3),
	scale: percent(90),
};

export default {
	seal_e: {
		top: percent(-2),
		left: percent(4),
		scale: percent(95),
	},
	seal_d: signPosition,
	seal_c: signPosition,
	seal_b: signPosition,
	seal_a: {
		top: percent(-4),
		left: percent(4),
		scale: percent(90),
	},
	tdc_rune_a: signPosition,
	tdc_rune_b: {
		top: percent(-4),
		left: percent(3),
		scale: percent(85),
	},
	tdc_rune_c: signPosition,
	tdc_rune_d: {
		top: percent(-5),
		left: percent(7),
		scale: percent(90),
	},
	tdc_rune_e: {
		top: percent(-4),
		left: percent(4),
		scale: percent(90),
	},
	tdc_rune_f: {
		top: percent(-1),
		left: percent(-2),
		scale: percent(90),
	},
	tdc_rune_g: {
		top: percent(-4),
		left: percent(3),
		scale: percent(85),
	},
	tdc_rune_h: {
		top: percent(-4),
		left: percent(2),
		scale: percent(90),
	},
	tdc_rune_i: {
		top: percent(-4),
		left: percent(6),
		scale: percent(90),
	},
	tdc_rune_j: signPosition,
	tdc_rune_k: {
		top: percent(-4),
		left: percent(3),
		scale: percent(80),
	},
	tdc_rune_l: signPosition,
	tdc_rune_m: {
		top: percent(-2),
		left: percent(3),
		scale: percent(90),
	},
	tdc_rune_n: signPosition,
	tdc_rune_o: {
		top: percent(-3),
		left: percent(4),
		scale: percent(93),
	},
	tdc_rune_p: signPosition,
	tdc_rune_q: signPosition,
	tdc_rune_r: signPosition,
	tdc_rune_s: signPosition,
	tdc_rune_t: signPosition,
	tdc_rune_u: {
		top: percent(-5),
		left: percent(4),
		scale: percent(90),
	},
	tdc_rune_v: signPosition,
	tdc_rune_w: {
		top: percent(-4),
		left: percent(4),
		scale: percent(90),
	},
	tdc_rune_x: signPosition,
	tdc_rune_y: {
		top: percent(-3),
		left: percent(5),
		scale: percent(90),
	},
	tdc_rune_z: {
		top: percent(-3),
		left: percent(3),
		scale: percent(80),
	},
} as IconPositionManifest;
