import { percent } from "@/shared/util";
import type { IconPositionManifest } from "../../../model";

const signPosition = {
	left: percent(-1),
	top: percent(-1),
	scale: percent(90),
};

export default {
	seal_e: {
		scale: percent(95),
	},
	seal_d: signPosition,
	seal_c: signPosition,
	seal_b: signPosition,
	seal_a: {
		top: percent(-2),
		scale: percent(90),
	},
	tdc_rune_a: signPosition,
	tdc_rune_b: {
		left: percent(-1),
		top: percent(-2),
		scale: percent(85),
	},
	tdc_rune_c: signPosition,
	tdc_rune_d: {
		top: percent(-3),
		left: percent(3),
		scale: percent(90),
	},
	tdc_rune_e: {
		top: percent(-2),
		scale: percent(90),
	},
	tdc_rune_f: {
		top: percent(1),
		left: percent(-6),
		scale: percent(90),
	},
	tdc_rune_g: {
		left: percent(-1),
		top: percent(-2),
		scale: percent(85),
	},
	tdc_rune_h: {
		top: percent(-2),
		left: percent(-2),
		scale: percent(90),
	},
	tdc_rune_i: {
		top: percent(-2),
		left: percent(2),
		scale: percent(90),
	},
	tdc_rune_j: signPosition,
	tdc_rune_k: {
		left: percent(-1),
		top: percent(-2),
		scale: percent(80),
	},
	tdc_rune_l: signPosition,
	tdc_rune_m: {
		left: percent(-1),
		scale: percent(90),
	},
	tdc_rune_n: signPosition,
	tdc_rune_o: {
		top: percent(-1),
		scale: percent(93),
	},
	tdc_rune_p: signPosition,
	tdc_rune_q: signPosition,
	tdc_rune_r: signPosition,
	tdc_rune_s: signPosition,
	tdc_rune_t: signPosition,
	tdc_rune_u: {
		top: percent(-3),
		scale: percent(90),
	},
	tdc_rune_v: signPosition,
	tdc_rune_w: {
		top: percent(-2),
		scale: percent(90),
	},
	tdc_rune_x: signPosition,
	tdc_rune_y: {
		top: percent(-1),
		left: percent(1),
		scale: percent(90),
	},
	tdc_rune_z: {
		left: percent(-1),
		top: percent(-1),
		scale: percent(80),
	},
} as IconPositionManifest;
