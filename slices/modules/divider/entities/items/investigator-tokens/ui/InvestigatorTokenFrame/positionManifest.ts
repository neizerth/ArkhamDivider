import type { IconPositionManifest } from "@/modules/core/icon/shared/model";
import { percent } from "@/shared/util";

export const positionManifest: IconPositionManifest = {
	guardian: {
		top: 0,
		left: 0,
		scale: 0.9,
	},
	seeker: {
		left: 0,
		top: 0,
		scale: 0.9,
	},
	survivor: {
		top: 0,
		left: 0,
		scale: 1,
	},
	mystic: {
		left: 0,
		top: 0,
		scale: 1,
	},
	neutral: {
		top: percent(-2),
		left: 0,
		scale: 1,
	},
	rogue: {
		top: 0,
		left: 0,
		scale: 0.9,
	},
};
