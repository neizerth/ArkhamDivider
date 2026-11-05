import { percent } from "@/shared/util";
import type { IconPositionManifest } from "../../../../model";
import { prefixIcons } from "../../util";

const icons: IconPositionManifest = {
	brynes_expedition: {
		top: percent(-4),
		scale: percent(87),
	},
	watchful_eye: {
		scale: percent(95),
	},
	canyon_protector: {
		top: percent(-1),
		left: percent(3),
		scale: percent(95),
	},
	devils_in_the_canyon_set: {
		top: percent(3),
		scale: percent(90),
	},
};

const prefixedIcons = prefixIcons("devils_in_the_canyon", icons);

export default {
	devils_in_the_canyon: {
		top: percent(-2),
		scale: percent(87),
	},
	...prefixedIcons,
} as IconPositionManifest;
